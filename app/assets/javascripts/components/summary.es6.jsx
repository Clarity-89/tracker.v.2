class Summary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header = this.props.macros.map((el, i)=> {
            return <th className="col s2 th" key={i}>{cap(el)}</th>
        });
        let body = this.props.macros.map((el, i)=> {
            return <td key={i} className="col s2 td">{this.props.total[el] || 0}</td>
        });
        return (
            <table>
                <thead>
                <tr className="row">
                    <th className="col s3 th">&nbsp;</th>
                    {header}
                </tr>
                </thead>
                <tbody>
                <tr className="row">
                    <td className="col s3 td">Total:</td>
                    {body}
                </tr>
                </tbody>
            </table>
        )
    }
}

