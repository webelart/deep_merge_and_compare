const expect = require('chai').expect;
const deepCompare = require('../src/deepCompare');

describe('Deep Compare testing', () => {
    it('1. Expects numbers to be equal', () => {
        expect(
            deepCompare(1, 1),
        ).to.equal(true);    
    });

    it('2. Expects same types is not to be equal', () => {
        expect(
            deepCompare(1, 2),
        ).to.equal(false);
    });

    it('3. Expects nulls to be equal', () => {
        expect(
            deepCompare(null, null),
        ).to.equal(true);    
    });

    it('4. Expects one null not to be equal object', () => {
        expect(
            deepCompare(null, {}),
        ).to.equal(false);    
    });

    it('5. Expects array is not to be equal object', () => {
        expect(
            deepCompare([], {}),
        ).to.equal(false);    
    });

    it('6. Expects different length of arrays is to be equal', () => {
        expect(
            deepCompare([1, 2, 3, 4], [1, 2, 3]),
        ).to.equal(false);    
    });

    it('7. Expects same length of arrays is not to be equal', () => {
        expect(
            deepCompare([1, 2, 4], [1, 2, 3]),
        ).to.equal(false);    
    });

    it('8. Expects arrays is to be equal', () => {
        expect(
            deepCompare([1, 2, 3], [1, 2, 3]),
        ).to.equal(true);    
    });

    it('9. Expects deep arrays is to be equal', () => {
        expect(
            deepCompare(
                [1, 2, [3, 9, 0], [1, [7, 8], [9, 10]], 8],
                [1, 2, [3, 9, 0], [1, [7, 8], [9, 10]], 8]
            ),
        ).to.equal(true);    
    });

    it('10. Expects deep arrays is not to be equal', () => {
        expect(
            deepCompare(
                [1, 2, [3, 9, 6], [1, [7, 8], [9, 10]], 8],
                [1, 2, [3, 9, 0], [1, [7, 8], [9, 10]], 8]
            ),
        ).to.equal(false);    
    });

    it('11. Expects different size of objects is to be equal', () => {
        expect(
            deepCompare({a: 1, b: 2}, {a: 1, c: 2, g: 3}),
        ).to.equal(false);    
    });

    it('12. Expects same size of objects is not to be equal', () => {
        expect(
            deepCompare({a: 1, b: 2}, {a: 1, c: 2}),
        ).to.equal(false);    
    });

    it('13. Expects objects is to be equal', () => {
        expect(
            deepCompare({a: 1, b: 2, c: 6}, {a: 1, b: 2, c: 6}),
        ).to.equal(true);    
    });

    it('14. Expects deep objects is to be equal', () => {
        expect(
            deepCompare(
                {a: 1, b: {g: 6, f: [1, {g: 7}, 2], j: 6}, c: 6, p: [] },
                {a: 1, b: {g: 6, f: [1, {g: 7}, 2], j: 6}, c: 6, p: [] }
            ),
        ).to.equal(true);    
    });

    it('15. Expects deep objects is not to be equal', () => {
        expect(
            deepCompare(
                {a: 1, b: {g: 6, f: [1, {g: 7}, 2], j: 6}, c: 6, p: [8] },
                {a: 1, b: {g: 6, f: [1, {g: 7}, 2], j: 6}, c: 6, p: [] }
            ),
        ).to.equal(false);    
    });
});