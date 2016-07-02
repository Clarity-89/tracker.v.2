class Mealtime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            loading: false
        }
    }

    // Manually toggle collapsible on click
    click(e) {
        $(ReactDOM.findDOMNode(e.currentTarget)).siblings('.collapsible-body').toggle();
    }

    selectProduct(product) {
        this.setState({loading: true});
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
                })
                console.log(this.state.selected)
            })
            .error(response => {
                this.setState({loading: false});
                console.log('error', response);
            });
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
                                     select={this.selectProduct.bind(this)}/>
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
    }

    render() {
        let {food, select} = this.props;
        let result = food.map((el, i) => {
            return (
                <div className="row" key={i}>
                    <a href="#details" className="col s3 modal-trigger"
                       onClick={()=>{select(el)}}>{formatName(el.name)}</a>
                    <p className="col s2">{el.protein}</p>
                    <p className="col s2">{el.carbs}</p>
                    <p className="col s2">{el.fat}</p>
                    <p className="col s2">{el.calories}</p>
                </div>
            )
        });

        return <span>{result}</span>;
    }
}