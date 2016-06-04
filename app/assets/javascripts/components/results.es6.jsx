/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    showMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.dropdown-content').hide();
        $(ReactDOM.findDOMNode(e.currentTarget)).siblings('.dropdown-content').toggle();
    }

    render() {
        let results = this.props.results.length ? this.props.results.map((el, i) => {
            return <li key={i}>
                <div className="collapsible-header">{el.fields.item_name}
                    <i className="material-icons dropdown-button" onClick={this.showMenu.bind(this)}>add</i>
                    <Dropdown times={this.props.times} add={this.props.add} meal={el}/>
                </div>

                <div className="collapsible-body">

                    <p>Size (g): {el.fields.nf_serving_weight_grams} </p>
                    <p>Calories: {el.fields.nf_calories}</p>
                    <p>Protein: {el.fields.nf_protein}</p>
                    <p>Carbohydrates: {el.fields.nf_total_carbohydrate}</p>
                    <p>Fat: {el.fields.nf_total_fat}</p>
                </div>
            </li>
        }) : <p>No results yet</p>;

        return <ul className="collapsible" data-collapsible="accordion">{results}</ul>
    }
}

const Dropdown = (props) => {
    let menu = props.times.map((el, i) => {
        return <li key={i}><a href="#" onClick={(e) => props.add(props.meal, el, e)}>{cap(el)}</a></li>
    });

    return <ul className='dropdown-content'>{menu}</ul>
};