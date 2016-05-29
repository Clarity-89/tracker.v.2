describe('Utils.sumProps', function () {

    it('should sum props of two objects', function () {
        var obj1 = {
                protein: 15,
                carbs: 10,
                fat: 11,
                cals: 500
            },
            obj2 = {
                protein: 5,
                carbs: 10,
                fat: 9,
                cals: 500
            };

        var sum = sumProps(obj1, obj2);
        expect(sum.protein).toEqual(20);
        expect(sum.carbs).toEqual(20);
        expect(sum.fat).toEqual(20);
        expect(sum.cals).toEqual(1000);
    });

});