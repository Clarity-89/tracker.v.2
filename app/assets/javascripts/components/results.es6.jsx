/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            selected: {
                fields: {}
            }
        }
    }

    selectProduct(product) {
        console.log('got product', product)
        this.setState({selected: product, modalOpen: true});
    }

    render() {
        let {results} = this.props;
        let data = results.length ? results.map((el, i) => {
            return <a href="#details" key={i} className="collection-item modal-trigger"
                      onClick={()=>{this.selectProduct(el)}}>
                {el.fields.item_name}
            </a>
        }) : <p className="no-results">No results for your query</p>;
        console.log('modal', this.state.modalOpen)
        return (
            <div>
                <div className="collection with-header col s12 m6 offset-m3">
                    <div className="collection-header"><h4>Results</h4></div>
                    {data}
                </div>
                <FoodDetails open={this.state.modalOpen} product={this.state.selected.fields}/>
            </div>
        )
    }
}

const Dropdown = (props) => {
    let menu = props.times.map((el, i) => {
        return <li key={i}><a href="#" onClick={(e) => props.add(props.meal, el, e)}>{cap(el)}</a></li>
    });

    return <ul className='dropdown-content'>{menu}</ul>
};