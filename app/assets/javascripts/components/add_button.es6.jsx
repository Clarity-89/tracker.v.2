class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    clicked() {
        this.setState({clicked: !this.state.clicked});
    }

    isClicked(el) {
        if (el === 'div') {
            return 'cover ' + (this.state.clicked ? 'active' : '');
        } else if (el === 'p') {
            return 'meal-title ' + (this.state.clicked ? 'active' : '');
        }
    }

    redirect(param) {
        return window.location = '/serving/find?time=' + param;
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
                            <a className="btn-floating green" onClick={()=>{this.redirect('breakfast')}}>
                                <i className="material-icons">free_breakfast</i>
                            </a>
                        </li>
                        <li><p className={this.isClicked('p')}>Lunch</p>
                            <a className="btn-floating yellow darken-1" onClick={()=>{this.redirect('lunch')}}>
                                <i><img className="material-icons" src="/assets/lunch.svg"/></i>
                            </a>
                        </li>
                        <li><p className={this.isClicked('p')}>Dinner</p>
                            <a className="btn-floating blue" onClick={()=>{this.redirect('dinner')}}>
                                <i><img className="material-icons" src="/assets/dinner.svg"/></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

