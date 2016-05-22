const Paginator = (props) => {
    if (props.numPages) {
        let indents = [];
        for (let i = 0; i < props.numPages; i++) {
            indents.push(<li className={props.active(i)} key={i} onClick={() => props.setPage(i)}><a
                href="#!">{i + 1}</a>
            </li>);
        }
        return <ul className="pagination">
            <li className="waves-effect" onClick={props.back}><a href="#!"><i
                className="material-icons">chevron_left</i></a></li>
            {indents}
            <li className="waves-effect" onClick={props.forward}><a href="#!"><i
                className="material-icons">chevron_right</i></a></li>
        </ul>;
    } else {
        return <span/>;
    }
};

