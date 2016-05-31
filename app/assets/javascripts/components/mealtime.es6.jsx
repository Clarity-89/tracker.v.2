class Mealtime extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        $.get('/serving/meal_data', { date: this.props.date })
            .done(response => console.log('success', response))
            .fail(response => console.log('error', response));
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