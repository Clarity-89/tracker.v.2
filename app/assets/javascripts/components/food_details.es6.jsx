class FoodDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.time
        }
    }

    componentDidMount() {
        $(document).ready(function() {
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
        });
    }

    select(el) {
        this.setState({ selected: el });
    }

    render() {
        let { product, loading } = this.props;
        let fields = filterFields(Object.keys(product)).map((field, i) => {
            if (product[field])
                return <div className="collection-item" key={i}><b>{formatField(field)}</b>: {product[field]}</div>
        });
        let results = loading ? <Loader /> :
            <div className="modal-content">
                <div className="row">
                    <div className="col s12 m6"><h4>{formatName(product.item_name)}</h4></div>
                    <Select {...this.props} selected={this.state.selected} select={this.select.bind(this)}/>
                </div>
                <div className="collection">
                    {fields}
                </div>
            </div>;
        return (
            <div id="details" className="modal modal-fixed-footer">
                {results}
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat"
                       onClick={ (e)=>{this.props.addEntry(product, this.state.selected, e)}}>Add</a>
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                </div>
            </div>
        )
    }
}
