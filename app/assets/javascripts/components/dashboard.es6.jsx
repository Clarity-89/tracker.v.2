class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("D MMMM, YYYY"),
            results: [],
            searchValue: '',
            data: {},
            loading: false
        }
    }

    setDate() {
        console.log('got date', this.state.date);
    }

    componentDidMount() {
        let self = this;
        this.getDailyServings(this.state.date);
        $('.datepicker').pickadate({
            onClose: function(e) {
                let date = this.get();
                self.setState({ date: date });
                self.getDailyServings(date);
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
    }

    getDailyServings(date) {
        $.get('/serving', { date: date })
            .done(response => this.setState({ data: response.data }))
            .fail(response => console.log("Error", response));
    }

    removeEntry(product) {
        $.ajax({
            url: '/serving/delete',
            method: 'DELETE',
            data: { id: product.id }
        })
            .done(response=>Materialize.toast('Successfully deleted product', 1000))
            .fail(response=>Materialize.toast('Failed to remove product. Please try again later.', 2000));
    }

    render() {
        let total = this.state.data.totals || {};
        //console.log(this.state.data)
        return (
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <Datepicker date={this.state.date} setDate={this.setDate.bind(this)}/>
                    <Summary total={total} macros={this.props.macros}/>
                    <Mealtime data={this.state.data.mealtimes} macros={this.props.macros}
                              removeEntry={this.removeEntry.bind(this)}
                              times={this.props.times}/>
                </div>
                <AddButton date={this.state.date}/>
            </div>
        )
    }
}