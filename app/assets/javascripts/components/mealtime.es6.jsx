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
        this.setState({ loading: true });
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb"
        };
        $.get(`https://api.nutritionix.com/v1_1/item/?id=${product._id}`, params)
            .done(response => this.setState({
                loading: false,
                selected: response
            }))
            .error(response => {
                this.setState({ loading: false });
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
                                {
                                    this.props.macros.map((macro, i2) => {

                                        return (
                                            <span className="col s2" key={i2}>
                                                {this.props.data[time]['totals'][macro]}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="collapsible-body">
                            <Product food={this.props.data[time]['food']} {...this.props}
                                     select={this.selectProduct.bind(this)}/>
                        </div>
                    </li>
                )
            });

            return (
                <div>
                    <ul className="collapsible" data-collapsible="accordion">
                        {times}
                    </ul>
                    <FoodDetails {...this.props} loading={this.state.loading} product={this.state.selected}/>
                </div>
            )
        } else {
            return false;
        }
    }
}

const Product = (props) => {

    let result = props.food.map((el, i) => {
        return (
            <div className="row" key={i}>
                <a href="#details" className="col s3 modal-trigger" onClick={()=>{props.select(el)}}>{formatName(el.name)}</a>
                <p className="col s2">{el.protein}</p>
                <p className="col s2">{el.carbs}</p>
                <p className="col s2">{el.fat}</p>
                <p className="col s2">{el.calories}</p>
            </div>
        )
    });

    return <span>{result}</span>;
};