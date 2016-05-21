class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD"),
            results: [{name: 'banana', size: '15g'}, {name: 'potato', size: '12g'}]
        }
    }

    setDay() {
        console.log('got date', this.state.day);
    }

    componentDidMount() {
        let self = this;
        $('.datepicker').pickadate({
            onClose: function (e) {
                self.setState({day: this.get()});
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
    }

    render() {
        return (<div class="container">
            <div className="row">
                <div className="col s12 m4">
                    <Search />
                    <Results results={this.state.results}/>
                </div>
                <div className="col s12 m6 offset-m2">
                    <Datepicker day={this.state.day} setDay={this.setDay.bind(this)}/>
                </div>
            </div>
        </div>)
    }
}

