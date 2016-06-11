class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }

    pageBack() {
        let { currentPage } = this.props;
        if (currentPage - 1 >= 0) {
            this.props.setPage(currentPage - 1);
        }
    }

    pageForward() {
        let { currentPage, results, pageSize } = this.props;
        if (currentPage + 1 < results.length / pageSize) {
            this.props.setPage(currentPage + 1);
        }
    }

    isActive(value) {
        return 'waves-effect ' + (value === this.props.currentPage ? 'active' : '');
    }

    render() {
        let numPages = Math.ceil(this.props.results.length / this.props.pageSize);
        if (numPages) {
            let indents = [];
            for (let i = 0; i < numPages; i++) {
                indents.push(<li className={this.isActive(i)} key={i} onClick={() => this.props.setPage(i)}><a
                    href="#!">{i + 1}</a>
                </li>);
            }
            return <ul className="pagination col s12 m6 offset-m3">
                <li className="waves-effect" onClick={this.pageBack.bind(this)}><a href="#!"><i
                    className="material-icons">chevron_left</i></a></li>
                {indents}
                <li className="waves-effect" onClick={this.pageForward.bind(this)}><a href="#!"><i
                    className="material-icons">chevron_right</i></a></li>
            </ul>;
        } else {
            return <span/>;
        }
    }
}

