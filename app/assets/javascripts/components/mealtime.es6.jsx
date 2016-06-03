class Mealtime extends React.Component {
    constructor(props) {
        super(props);
    }

    // Manually toggle collapsible on click
    click(e) {
        $(ReactDOM.findDOMNode(e.currentTarget)).siblings('.collapsible-body').toggle()
    }

    render() {

        if (this.props.data) {
            let times = this.props.times.map((time, i1)=> {

                return (
                    <li key={i1}>
                        <div className="collapsible-header header-custom" onClick={this.click.bind(this)}>
                            <div className="row">
                                <span className="col s4">
                                    {cap(time)}
                                </span>
                                {
                                    this.props.macros.map((macro, i2) => {

                                        return (
                                            <span className="col s2" key={i2}>
                                                {this.props.data[time]['totals'][macro]}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="collapsible-body">
                            <Product food={this.props.data[time]['food']} {...this.props}/>
                        </div>
                    </li>
                )
            });
            return (
                <ul className="collapsible" data-collapsible="accordion">
                    {times}
                </ul>
            )
        } else {
            return false;
        }
    }
}

Mealtime.defaultProps = {
    times: ['breakfast', 'lunch', 'dinner']
};

const Product = (props) => {

    let result = props.food.map((el, i) => {
        return <p key={i}>{el.name} {el.protein} {el.carbs} {el.fat} {el.calories}</p>
    });
    return (

        <div>{result}</div>

    )
};