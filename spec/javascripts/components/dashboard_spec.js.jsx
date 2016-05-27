var TestUtils = React.addons.TestUtils;

describe('Dashboard', function () {

    var dashboard = null, node = null,
        instance = null;

    beforeEach(function () {
        dashboard = TestUtils.renderIntoDocument(<Dashboard />)
    });

    it('should be an element', function () {
        expect(TestUtils.isElementOfType(<Dashboard />, Dashboard)).toBe(true);
    });
});