var TestUtils = React.addons.TestUtils;;

describe('Dashboard', function () {

    var dashboard = null, node = null,
        instance = null;

    beforeEach(function () {
        dashboard = TestUtils.renderIntoDocument(<Dashboard />);
        node = ReactDOM.findDOMNode(dashboard);
    });

    it('should be an element', function () {
        expect(TestUtils.isElementOfType(<Dashboard />, Dashboard)).toBe(true);
    });

    it('should be rendered into a div', function () {
        expect(node.tagName).toEqual("DIV");
    });

    describe('getDailyServings', function () {
        it('should be called on component mount', function () {
            spyOn(Dashboard.prototype, 'getDailyServings');
            TestUtils.renderIntoDocument(<Dashboard />);
            expect(Dashboard.prototype.getDailyServings).toHaveBeenCalled();
        })
    })
});