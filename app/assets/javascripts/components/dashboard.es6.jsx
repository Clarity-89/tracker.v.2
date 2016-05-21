class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD")
        }
    }

    setDay(e) {
        console.log('got date', e.target.value)
        this.setState({day: e.target.value})
    }

    componentDidMount() {
        console.log('got props', this.props, this.state.day)
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

