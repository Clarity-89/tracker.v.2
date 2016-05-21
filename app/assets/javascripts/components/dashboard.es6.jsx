class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log('got props', this.props)
    }

    render() {
        return (<div className="row">
            <div className="col s12 m4">
                <Search />
            </div>
        </div>);
    }
}

