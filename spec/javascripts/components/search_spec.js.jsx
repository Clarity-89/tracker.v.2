var TestUtils = React.addons.TestUtils;

describe('Search', function () {
    var search = null, searchNode = null,
        instance = null;
    beforeEach(function () {
        search = new Search({
            value: 'testing',
            changeHandler: jasmine.createSpy('changeHandler')
        });
        instance = TestUtils.renderIntoDocument(search);
    });

    it('has default value set properly', function () {
        searchNode = ReactDOM.findDOMNode(instance).querySelectorAll("input")[0];
        expect(searchNode.value).toEqual('testing');
    });
    
});