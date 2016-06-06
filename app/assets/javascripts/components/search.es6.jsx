const Search = (props) => {
    return (
        <div className="row">
            <div className="input-field">
                <div className="col s8">
                    <input id="search" type="search" value={props.value} onChange={props.changeHandler}
                           onKeyDown={props.keypress}/>
                    <label htmlFor="search">Search</label>
                </div>
                <div className="col s2">
                    <button type="button" className="btn" onClick={props.clickHandler}>Search</button>
                </div>
            </div>
        </div>
    )
};



