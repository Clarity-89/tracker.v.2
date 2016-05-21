const Search = (props) => {
    return <div className="input-field">
        <input id="search" type="search" value={props.value} onChange={props.changeHandler}/>
        <label for="search">Search</label>
        <button type="button" className="btn" onClick={props.clickHandler}>Search</button>
        <i className="material-icons">close</i>
    </div>
};


