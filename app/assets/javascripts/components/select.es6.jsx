class Select extends React.Component {
    render() {
        let options = this.props.times.map((el, i) => {
            return <option value="el" key={i}>{cap(el)}</option>
        });
        
        return <div className="input-field col s12">
            <select>
                {options}
            </select>
            <label>Meal</label>
        </div>;
    }
}

