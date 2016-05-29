class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD"),
            results: [],
            searchValue: '',
            totals: props.totals,
            servings: props.servings
        }
    }

    setDay() {
        console.log('got date', this.state.day);
    }

    componentDidMount() {
        let self = this;
        $('.datepicker').pickadate({
            onClose: function (e) {
                let day = this.get();
                self.setState({day: day});
                self.getDailyServings(day);
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
        $('.dropdown-button').dropdown({hover: true});
    }

    getData() {
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb",
            "fields": "item_name,nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat,nf_serving_weight_grams,nf_serving_size_unit,nf_serving_size_qty",
            results: '0:50'
        };
        $.get("https://api.nutritionix.com/v1_1/search/" + this.state.searchValue, params)
            .done(response => this.setState({results: response.hits.filter(el => el.fields.nf_serving_weight_grams)}))
            .error(response => console.log('error', response));
    }

    setSearch(e) {
        this.setState({searchValue: e.target.value})
    }

    getDailyServings(day) {
        $.get('/serving', {date: day})
            .done(response => this.setState({totals: response.totals}))
            .fail(response => console.log("Error", response));
    }

    addEntry(entry, e) {
        e.stopPropagation();
        $.post('/serving/create', {entry: entry, date: this.state.day})
            .done(() => {
                let arr = this.state.servings.slice(),
                    o = {
                        cals: entry.fields.nf_calories,
                        protein: entry.fields.nf_protein,
                        carbs: entry.fields.nf_total_carbohydrate,
                        fat: entry.fields.nf_total_fat
                    },
                    sum = sumProps(this.state.totals, o);
                arr.push(entry);
                this.setState({servings: arr, totals: sum});
            })
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
                    <Summary total={this.state.totals}/>
                </div>
            </div>
        )
    }
}

const sumProps = (o1, o2) => {
    let sum = {};
    for (let prop in o1) {
        if (o1.hasOwnProperty(prop)) {
            sum[prop] = (o1[prop] + o2[prop]).toFixed(2) / 1;
        }
    }
    return sum;
};