class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Calories</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total:</td>
                    <td>{this.props.protein}</td>
                    <td>{this.props.carbs}</td>
                    <td>{this.props.fat}</td>
                    <td>{this.props.calories}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

