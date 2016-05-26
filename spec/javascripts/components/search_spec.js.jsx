var TestUtils = React.addons.TestUtils;

describe('Search', function () {

    it('has default value set properly', function () {
        var search = TestUtils.renderIntoDocument(
            <div>
                <Search value={'testing'} changeHandler={function(){}}
                        clickHandler={function(){}}/>
            </div>
        );

        var searchNode = ReactDOM.findDOMNode(search);
        console.log('seach', search)

        expect(searchNode.value).toEqual('testingg');
    })
});