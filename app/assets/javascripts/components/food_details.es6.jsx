class FoodDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function () {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
        });
    }

    render() {
        let {product, loading} = this.props;
        let results = loading ? <Loader /> :
            <div className="modal-content">
                <h4>{formatName(product)}</h4>
                <p>Size (g): {product.nf_serving_weight_grams} </p>
                <p>Calories: {product.nf_calories}</p>
                <p>Protein: {product.nf_protein}</p>
                <p>Carbohydrates: {product.nf_total_carbohydrate}</p>
                <p>Fat: {product.nf_total_fat}</p>
            </div>;
        return (
            <div id="details" className="modal">
                {results}
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Add</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                </div>
            </div>
        )
    }
}

