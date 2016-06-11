class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    clicked(e) {
        this.setState({clicked: !this.state.clicked});
    }

    isClicked(el) {
        if (el === 'div') {
            return 'cover ' + (this.state.clicked ? 'active' : '');
        } else if (el === 'p') {
            return 'meal-title ' + (this.state.clicked ? 'active' : '');
        }

    }

    render() {
        return (
            <div className={this.isClicked('div')}>
                <div className="fixed-action-btn vertical click-to-toggle" id="add-food">
                    <a className="btn-floating btn-large red" onClick={this.clicked.bind(this)}>
                        <i className="material-icons">add</i>
                    </a>
                    <ul>
                        <li><p className={this.isClicked('p')}>Breakfast</p>
                            <a className="btn-floating green">
                                <i className="material-icons">format_quote</i>
                            </a>
                        </li>
                        <li><p className={this.isClicked('p')}>Lunch</p>
                            <a className="btn-floating yellow darken-1">
                                <i className="material-icons">publish</i>
                            </a>
                        </li>
                        <li><p className={this.isClicked('p')}>Dinner</p>
                            <a className="btn-floating blue"><i className="material-icons">attach_file</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

