class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header = this.props.macros.map((el, i)=> {
            return <th key={i}>{cap(el)}</th>
        });
        let body = this.props.macros.map((el, i)=> {
            return <td key={i}>{this.props.total[el] || 0}</td>
        });
        return (
            <table>
                <thead>
                <tr>
                    <th></th>
                    {header}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total:</td>
                    {body}
                </tr>
                </tbody>
            </table>
        )
    }
}

