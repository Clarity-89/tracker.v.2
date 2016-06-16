/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            loading: false
        }
    }

    selectProduct(product) {
        this.setState({ loading: true });
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb"
        };
        $.get("https://api.nutritionix.com/v1_1/item/?id=" + product._id, params)
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
        let { paginated } = this.props;
        let data = paginated.length ? paginated.map((el, i) => {
            return <a href="#details" key={i} className="collection-item modal-trigger"
                      onClick={()=>{this.selectProduct(el)}}>
                {el.fields.item_name}
            </a>
        }) : <p className="no-results">No results for your query</p>;

        return (
            <div>
                <div className="collection with-header col s12 m6 offset-m3">
                    <div className="collection-header"><h4>Results</h4></div>
                    {data}
                </div>
                <FoodDetails {...this.props} loading={this.state.loading} product={this.state.selected}/>
            </div>
        )
    }
}