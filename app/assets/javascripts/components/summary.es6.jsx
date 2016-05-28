class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {protein, cals, carbs, fat} = this.props.total;
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
                    <td>{protein}</td>
                    <td>{carbs}</td>
                    <td>{fat}</td>
                    <td>{cals}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

