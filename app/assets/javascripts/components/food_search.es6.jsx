class FoodSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            searchValue: '',
            loading: false
        }
    }

    componentDidMount(){
        console.log('time', this.props.time)
    }
    getData() {
        this.setState({loading: true});
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb",
            "fields": "item_name,nf_calories,nf_protein,nf_total_carbohydrate,nf_total_fat,nf_serving_weight_grams,nf_serving_size_unit,nf_serving_size_qty",
            results: '0:50'
        };
        $.get("https://api.nutritionix.com/v1_1/search/" + this.state.searchValue, params)
            .done(response => this.setState({
                loading: false,
                results: response.hits.filter(el => el.fields.nf_serving_weight_grams)
            }))
            .error(response => {
                this.setState({loading: false});
                console.log('error', response)
            });
    }

    setSearch(e) {
        this.setState({searchValue: e.target.value})
    }

    addEntry(entry, time, e) {
        e.stopPropagation();
        e.preventDefault();
        $.post('/serving/create', {entry: entry, date: this.state.date, time: time})
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
                this.setState({data: copy});
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
            <div className="col s12 m6">
                <Search value={this.state.searchValue} changeHandler={this.setSearch.bind(this)}
                        clickHandler={this.getData.bind(this)} keypress={this.handleEnterPress.bind(this)}/>
                <PaginatedResults addEntry={this.addEntry.bind(this)} results={this.state.results}
                                  times={this.props.times} loading={this.state.loading}/>
            </div>
        )
    }
}

