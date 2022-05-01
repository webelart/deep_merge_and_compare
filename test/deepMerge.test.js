const expect = require('chai').expect;
const deepMerge = require('../src/deepMerge');

describe('Deep Merge testing', () => {
    it('1. Expects 1 and {} to be {}', () => {
        expect(deepMerge(1, {})).to.deep.equal({});
    });

    it('2. Expects {} and [] to be []', () => {
        expect(deepMerge({}, [])).to.deep.equal([]);
    });

    it('3. Expects {} and null to be null', () => {
        expect(deepMerge({}, null)).to.equal(null);    
    });

    it('4. Expects [] and [] with primitives to be equal new array', () => {
        expect(
            deepMerge(
                [3, 'sdf', null, [undefined], 0],
                [4, 5, 'hhhh', undefined]
            )
        ).to.deep.equal(
            [3, 'sdf', null, [undefined], 0, 4, 5, 'hhhh', undefined]
        );    
    });

    it('5. Expects deep merge array with copy', () => {
        const arr1 = [ 1, 3, {a: 1, b: [1, 2, 3, {p: 6}]} ];
        const arr2 = [ 5, [1, 3, 4], { c: 1 } ];
        const mergedArray = deepMerge(arr1, arr2);

        expect(mergedArray).to.deep.equal(
            [ 1, 3, {a: 1, b: [1, 2, 3, {p: 6}]}, 5, [1, 3, 4], { c: 1 } ]
        );
        expect(mergedArray[2] === arr1[2]).to.equal(false);
        expect(mergedArray[2].b === arr1[2].b).to.equal(false);
        expect(mergedArray[2].b[3] === arr1[2].b[3]).to.equal(false);
    });

    it('6. Expects deep merge objects', () => {
        expect(
            deepMerge({a: 1, b: 3, c: 4}, {a: 5, b: 6, c: 7})
        ).to.deep.equal(
            {a: 5, b: 6, c: 7}
        );
        
        expect(
            deepMerge({a: 1, c: {j: 1, b: 2}}, {a: 5, b: 6, c: {j: 2, h: 7}})
        ).to.deep.equal(
            {a: 5, b: 6, c:  {j: 2, b: 2, h: 7}}
        );

        expect(
            deepMerge({a: 1, c: {j: [1, 5, null], b: 2}}, {a: 5, b: 6, c: {j: [10], h: 7}})
        ).to.deep.equal(
            {a: 5, b: 6, c:  {j: [1, 5, null, 10], b: 2, h: 7}}
        );
    });

    it('7. Expects deep merge objects with copy', () => {
        const obj1 = {a: 1, c: {j: [1, 5, [null]], b: 2, g: {l: 1}}};
        const obj2 = {a: 5, b: 6, c: {j: [10], h: 7}};
        const result = deepMerge(obj1, obj2);

        expect(result.c.g === obj1.c.g).to.equal(false);
        expect(result.c === obj1.c || result.c === obj2.c).to.equal(false);
        expect(result.c.j === obj1.c.j || result.c.j === obj2.c.j).to.equal(false);
        expect(result.c.j[2] === obj1.c.j[2]).to.equal(false);
    });
});