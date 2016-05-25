/*
 * A stateless component for displaying search results. Expects an array of results which are first filtered to remove
 * the ones without weight_in_grams defined.
 */

const Results = (props) => {
    let results = props.results.length ? props.results.map((el, i) => {
        return <li key={i}>
            <div className="collapsible-header">{el.fields.item_name}
                <i className="material-icons" onClick={(e) => props.add(el, e)}>add</i>
            </div>
            <div className="collapsible-body">
                <p>Size: {el.fields.nf_serving_weight_grams}g </p>
                <p>Calories: {el.fields.nf_calories}</p>
                <p>Protein: {el.fields.nf_protein}</p>
                <p>Carbohydrates: {el.fields.nf_total_carbohydrate}</p>
                <p>Fat: {el.fields.nf_total_fat}</p>
            </div>
        </li>
    }) : <p>No results yet</p>;

    return <ul className="collapsible" data-collapsible="accordion">{results}</ul>
};
