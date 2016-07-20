class Mealtime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            loading: false
        }
    }

    componentDidMount() {
        interact('.hold-menu').on('hold', function(event) {
            event.currentTarget.classList.toggle('active');
        })
    }

    // Manually toggle collapsible on click
    click(e) {
        $(ReactDOM.findDOMNode(e.currentTarget)).siblings('.collapsible-body').toggle();
    }

    selectProduct(product) {
        this.setState({ loading: true });
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb"
        };
        $.get(`https://api.nutritionix.com/v1_1/item/?id=${product._id}`, params)
         .done(response => {
             let selected = response;
             selected.id = product.id;
             this.setState({
                 loading: false,
                 selected: selected
             });
         })
         .error(response => {
             this.setState({ loading: false });
             Materialize.toast('Failed to retrieve data. Please try again later.', 2000)
         });
    }

    // Remove 'active' class from all elements
    removeActive(e, product) {
        document.querySelectorAll('.hold-menu').forEach(el => el.classList.remove('active'));
        $(ReactDOM.findDOMNode(e.currentTarget)).tooltip('remove');
        this.props.removeEntry(product);
    }

    render() {
        if (this.props.data) {
            let times = this.props.times.map((time, i1)=> {

                return (
                    <li key={i1}>
                        <div className="collapsible-header header-custom" onClick={this.click.bind(this)}>
                            <div className="row">
                                <span className="col s3">
                                    {cap(time)}
                                </span>
                                {this.props.macros.map((macro, i2) => {
                                    return (
                                        <span className="col s2" key={i2}>
                                            {this.props.data[time]['totals'][macro]}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="collapsible-body">
                            <Product food={this.props.data[time]['food']} {...this.props}
                                     select={this.selectProduct.bind(this)} remove={this.removeActive.bind(this)}/>
                            <FoodDetails {...this.props} handler={this.props.removeEntry} loading={this.state.loading}
                                                         time={time} product={this.state.selected}/>
                        </div>
                    </li>
                )
            });

            return (
                <div>
                    <ul className="collapsible" data-collapsible="accordion">
                        {times}
                    </ul>

                </div>
            )
        } else {
            return false;
        }
    }
}

class Product extends React.Component {

    componentDidMount() {
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
        $('.tooltipped').tooltip({ delay: 50 });
    }

    render() {
        let { food, select, remove } = this.props;
        let result = food.map((el, i) => {
            return (
                <div className="row hold-menu modal-trigger" data-target="details" onClick={()=>{select(el)}} key={i}>
                    <div className="mask">
                        <a href="#" className="waves-effect waves-circle waves-light btn-flat"
                           onClick={(e) => remove(e, el)}>
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                    <p className="col s3">{formatName(el.name)}</p>
                    <p className="col s2">{el.protein}</p>
                    <p className="col s2">{el.carbs}</p>
                    <p className="col s2">{el.fat}</p>
                    <p className="col s2">{el.calories}</p>
                    <p className="col s1 hide-on-med-and-down">
                        <a href="#" className="waves-effect waves-circle waves-light btn-flat tooltipped"
                           onClick={(e) => remove(e, el)} data-position="bottom"
                           data-delay="50" data-tooltip="Delete entry">
                            <i className="material-icons" id="delete">delete</i>
                        </a>
                    </p>
                </div>
            )
        });

        return <span>{result}</span>;
    }
}