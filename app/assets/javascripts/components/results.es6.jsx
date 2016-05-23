/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

const Results = (props) => {
    let results = props.results.length ? props.results.map((el, i) => {
        return <li key={i}>
            <div className="collapsible-header">{el.fields.item_name}
                <i className="material-icons" onClick={() => props.add(el)}>add</i>
            </div>
            <div className="collapsible-body">
                <p>Size: {el.fields.nf_serving_weight_grams}g </p>
                <p> Calories: {el.fields.nf_calories}</p>
            </div>
        </li>
    }) : <p>No results yet</p>;

    return <ul className="collapsible" data-collapsible="accordion">{results}</ul>
};
