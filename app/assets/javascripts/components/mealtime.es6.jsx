class Mealtime extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let times = this.props.times.map((el, i)=> {
            return (
                <li key={i}>
                    <div className="collapsible-header">
                        {el}
                    </div>
                </li>
            )
        });
        return (
            <ul>
                {times}
            </ul>
        )
    }
}

Mealtime.defaultProps = {
    times: ['breakfast', 'lunch', 'dinner']
};