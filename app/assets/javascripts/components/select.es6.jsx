class Select extends React.Component {
    constructor(props) {
        super(props);

    }

    select(e) {
        this.props.select(e.target.value);
    }

    render() {
        let options = this.props.times.map((el, i) => {
            return <option value={el} key={i}>{cap(el)}</option>
        });

        return (
            <div className="input-field col s12 m6 l4 offset-l2">
                <select className="browser-default" value={this.props.selected} onChange={this.select.bind(this)}>
                    {options}
                </select>
            </div>
        )
    }
}

