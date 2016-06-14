class PaginatedResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            pageSize: 10,
            results: props.results
        }
    }

    paginate() {
        let { pageSize, currentPage } = this.state;
        return this.props.results.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    }

    setPage(number) {
        this.setState({ currentPage: number });
    }

    render() {
        console.log('res', this.paginate())
        let resultsOrLoader = this.props.loading ? <Loader/> :
            <Results paginated={this.paginate()} add={this.props.addEntry} {...this.props}/>;

        return (
            <span className="row">
                {resultsOrLoader}
                 <Paginator results={this.props.results} setPage={this.setPage.bind(this)}
                            currentPage={this.state.currentPage} pageSize={this.state.pageSize}/>
            </span>
        )
    }
}

