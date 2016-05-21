const Results = (props) => {
    let results = props.results.map((el, i) => {
        return <li class="collection-item" key={i}>
            <span class="title">{el.name}</span><p>Size: {el.size}</p><a href="#!" class="secondary-content"><i
            class="material-icons">send</i></a>
        </li>
    });
    return <ul>{results}</ul>
};


