class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: moment().format("YYYY-MM-DD"),
            results: '',
            searchValue: ''
        }
    }

    setDay() {
        console.log('got date', this.state.day);
    }

    componentDidMount() {
        let self = this;
        $('.datepicker').pickadate({
            onClose: function (e) {
                self.setState({day: this.get()});
                $(document.activeElement).blur()
            },
            selectMonths: true,
            selectYears: 15
        });
    }

    setSearch(e) {
        this.setState({searchValue: e.target.value})
    }

    getData() {
        let params = {
            "appId": "13957b27",
            "appKey": "634647fd3fadbe686dbaacdbea287beb",
            "fields": "item_name,nf_calories,nf_serving_weight_grams,nf_serving_size_unit,nf_serving_size_qty",
            results: '0:50'
        };
        $.get("https://api.nutritionix.com/v1_1/search/" + this.state.searchValue, params)
            .done(response => this.setState({results: response.hits}))
            .error(response => console.log('error', response));
    }

    render() {
        return (<div class="container">
            <div className="row">
                <div className="col s12 m4">
                    <Search value={this.state.searchValue} changeHandler={this.setSearch.bind(this)}
                            clickHandler={this.getData.bind(this)}/>
                    <Results results={this.state.results}/>
                </div>
                <div className="col s12 m6 offset-m2">
                    <Datepicker day={this.state.day} setDay={this.setDay.bind(this)}/>
                </div>
            </div>
        </div>)
    }
}

