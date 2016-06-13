class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.time
        }
    }

    select(e) {
        this.setState({ selected: e.target.value });
    }

    render() {
        console.log('times', this.props.times, this.props.time)
        let options = this.props.times.map((el, i) => {
            return <option value={el} key={i}>{cap(el)}</option>
        });

        return (
            <div className="input-field col s12 m6 l4 offset-l2">
                <select className="browser-default" value={this.state.selected} onChange={this.select.bind(this)}>
                    {options}
                </select>
            </div>
        )
    }
}

