class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD")
        }
    }

    setDay() {
        console.log('got date', this.state.day);
    }

    componentDidMount() {
        let self = this;
        $('.datepicker').pickadate({
            onClose: function (e) {
                self.setState({day: this.get()})
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
                </div>
                <div className="col s12 m6 offset-m2">
                    <Datepicker day={this.state.day} setDay={this.setDay.bind(this)}/>
                </div>
            </div>
        </div>)
    }
}

