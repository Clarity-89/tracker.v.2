class FoodDetails extends React.Component {
    render() {
        return (
            <div className="collapsible-body">
                <p>Size (g): {el.fields.nf_serving_weight_grams} </p>
                <p>Calories: {el.fields.nf_calories}</p>
                <p>Protein: {el.fields.nf_protein}</p>
                <p>Carbohydrates: {el.fields.nf_total_carbohydrate}</p>
                <p>Fat: {el.fields.nf_total_fat}</p>
            </div>
        );
    }
}

