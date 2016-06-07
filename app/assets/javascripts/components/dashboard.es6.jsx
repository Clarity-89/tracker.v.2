class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD"),
            results: [],
            searchValue: '',
            data: {}
        }
    }

    setDate() {
        console.log('got date', this.state.date);
    }

    componentDidMount() {
        let self = this;
        this.getDailyServings(this.state.date);
        $('.datepicker').pickadate({
            onClose: function (e) {
                let date = this.get();
                self.setState({ date: date });
                self.getDailyServings(date);
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
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

    getDailyServings(date) {
        $.get('/serving', { date: date })
            .done(response => this.setState({ data: response.data }))
            .fail(response => console.log("Error", response));
    }

    addEntry(entry, time, e) {
        e.stopPropagation();
        e.preventDefault();
        $.post('/serving/create', { entry: entry, date: this.state.date, time: time })
        // Update state to show new values immediately
            .done(() => {
                let copy = Object.assign({}, this.state.data),
                    o = {
                        name: entry.fields.item_name,
                        calories: entry.fields.nf_calories,
                        protein: entry.fields.nf_protein,
                        carbs: entry.fields.nf_total_carbohydrate,
                        fat: entry.fields.nf_total_fat
                    };
                copy.totals = sumProps(copy.totals, o);
                copy.mealtimes[time].totals = sumProps(copy.mealtimes[time].totals, o);
                copy.mealtimes[time].food.push(o);
                this.setState({ data: copy });
            })
            .fail(response => console.log('error', response));
    }

    handleEnterPress(e) {
        if (e.keyCode == 13) {
            this.getData();
        }
    }

    render() {
        let total = this.state.data.totals || {};
        //console.log(this.state.data)
        return (
            <div className="row">
                <div className="col s12 m6">
                    <Search value={this.state.searchValue} changeHandler={this.setSearch.bind(this)}
                            clickHandler={this.getData.bind(this)} keypress={this.handleEnterPress.bind(this)}/>
                    <PaginatedResults addEntry={this.addEntry.bind(this)} results={this.state.results}
                                      times={this.props.times}/>
                </div>
                <div className="col s12 m6">
                    <Datepicker date={this.state.date} setDate={this.setDate.bind(this)}/>
                    <Summary total={total} macros={this.props.macros}/>
                    <Mealtime data={this.state.data.mealtimes} macros={this.props.macros} times={this.props.times}/>
                </div>
            </div>
        )
    }
}

Dashboard.defaultProps = {
    macros: ['protein', 'carbs', 'fat', 'calories'],
    times: ['breakfast', 'lunch', 'dinner']
};