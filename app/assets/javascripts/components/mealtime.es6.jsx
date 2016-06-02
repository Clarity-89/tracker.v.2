class Mealtime extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.data) {
            let times = this.props.times.map((time, i1)=> {

                return (
                    <li key={i1}>
                        <div className="collapsible-header" id="header-custom">
                            <div className="row">
                                <div className="col s4">
                                    {cap(time)}
                                </div>
                                {
                                    this.props.macros.map((macro, i2) => {

                                        return (
                                            <div className="col s2" key={i2}>
                                                {this.props.data[time]['totals'][macro]}
                                            </div>
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
                <ul className="collapsible">
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
    console.log(result)
    return (

        <div>{result}</div>

    )
};