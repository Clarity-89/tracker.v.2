const Results = (props) => {
    let results = props.results ? props.results.map((el, i) => {
        return <li className="collection-item" key={i}>
            <span className="title">{el.fields.item_name}</span><p>Size: {el.fields.nf_serving_weight_grams}g</p>
            <p>Calories: {el.fields.nf_calories}</p>
            <a href="#!" className="secondary-content">
                <i className="material-icons">send</i>
            </a>
        </li>
    }) : <p>No results yet</p>;

    return <ul>{results}</ul>
};


