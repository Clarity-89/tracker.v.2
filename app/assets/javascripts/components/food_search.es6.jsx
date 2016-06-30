class FoodSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            searchValue: '',
            loading: false
        }
    }

    getData() {
        this.setState({ loading: true });
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb",
            "fields": "item_name",
            "results": '0:50'
        };
        $.get(`https://api.nutritionix.com/v1_1/search/${this.state.searchValue}`, params)
            .done(response => this.setState({
                loading: false,
                results: response.hits
            }))
            .error(response => {
                this.setState({ loading: false });
                console.log('error', response);
                Materialize.toast('Could not get data. Please try again later', 2000);
            });
    }

    setSearch(e) {
        this.setState({ searchValue: e.target.value })
    }

    addEntry(entry, time, e) {
        e.stopPropagation();
        e.preventDefault();
        $.post('/serving/create', { entry: entry, date: this.props.date, time: time })
            .done(()=> {
                Materialize.toast('Successfully added product', 2000);
            })
            .fail(response => {
                Materialize.toast('Failed to add product', 2000);
                console.log('error', response);
            });
    }

    handleEnterPress(e) {
        if (e.keyCode == 13) {
            this.getData();
        }
    }

    render() {
        return (
            <div className="col s12 m6">
                <a href={'/serving/' + window.location.search} className="btn btn-flat">Back to tracker</a>
                <Search value={this.state.searchValue} changeHandler={this.setSearch.bind(this)}
                        clickHandler={this.getData.bind(this)} keypress={this.handleEnterPress.bind(this)}/>
                <PaginatedResults addEntry={this.addEntry.bind(this)} results={this.state.results}
                    {...this.props} loading={this.state.loading}/>
            </div>
        )
    }
}

