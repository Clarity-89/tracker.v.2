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
            onClose: function (e) {
                let date = this.get();
                self.setState({date: date});
                self.getDailyServings(date);
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
    }

    getDailyServings(date) {
        $.get('/serving', {date: date})
            .done(response => this.setState({data: response.data}))
            .fail(response => console.log("Error", response));
    }

    render() {
        let total = this.state.data.totals || {};
        //console.log(this.state.data)
        return (
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <Datepicker date={this.state.date} setDate={this.setDate.bind(this)}/>
                    <Summary total={total} macros={this.props.macros}/>
                    <Mealtime data={this.state.data.mealtimes} macros={this.props.macros} times={this.props.times}/>
                </div>
                <AddButton />
            </div>
        )
    }
}