class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD"),
            results: [],
            searchValue: ''
        }
    }

    setDay() {
        console.log('got date', this.state.day);
    }

    componentDidMount() {
        this.getDailyServings();
        let self = this;
        $('.datepicker').pickadate({
            onClose: function (e) {
                self.setState({ day: this.get() });
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
        $('.dropdown-button').dropdown({ hover: true });
    }

    getData() {
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb",
            "fields": "item_name,nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat,nf_serving_weight_grams,nf_serving_size_unit,nf_serving_size_qty",
            results: '0:50'
        };
        $.get("https://api.nutritionix.com/v1_1/search/" + this.state.searchValue, params)
            .done(response => this.setState({ results: response.hits.filter(el => el.fields.nf_serving_weight_grams) }))
            .error(response => console.log('error', response));
    }

    setSearch(e) {
        this.setState({ searchValue: e.target.value })
    }

    getDailyServings() {
        $.get('/serving', { date: this.state.day })
            .done(response => console.log('success', response))
            .fail(response => console.log("Error", response));
    }

    addEntry(entry, e) {
        e.stopPropagation();
        $.post('/serving/create', { entry: entry, date: this.state.day })
            .done(() => console.log('success'))
            .fail(response => console.log('error', response));
    }

   
    handleEnterPress(e) {
        if (e.keyCode == 13) {
            this.getData();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <Search value={this.state.searchValue} changeHandler={this.setSearch.bind(this)}
                            clickHandler={this.getData.bind(this)} keypress={this.handleEnterPress.bind(this)}/>
                    <PaginatedResults addEntry={this.addEntry.bind(this)} results={this.state.results}/>
                </div>
                <div className="col s12 m6">
                    <Datepicker day={this.state.day} setDay={this.setDay.bind(this)}/>
                </div>
            </div>
        )
    }
}

