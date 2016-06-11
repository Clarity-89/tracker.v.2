/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.collapsible').collapsible({});
    }

    showMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.dropdown-content').hide();
        $(ReactDOM.findDOMNode(e.currentTarget)).siblings('.dropdown-content').toggle();
    }

    render() {
        let {results} = this.props;
        let data = results.length ? results.map((el, i) => {
            return <li key={i} className="collection-item">
                {el.fields.item_name}
            </li>
        }) : <li className="no-results">No results for your query</li>;

        return (
            <ul className="collection with-header col s12 m6 offset-m3">
                <li className="collection-header"><h4>Results</h4></li>
                {data}
            </ul>
        )
    }
}

const Dropdown = (props) => {
    let menu = props.times.map((el, i) => {
        return <li key={i}><a href="#" onClick={(e) => props.add(props.meal, el, e)}>{cap(el)}</a></li>
    });

    return <ul className='dropdown-content'>{menu}</ul>
};