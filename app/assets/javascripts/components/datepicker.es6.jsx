const Datepicker = (props) => {
    return <input type="date" className="datepicker" value={props.day} onChange={props.setDay}/>;
};


