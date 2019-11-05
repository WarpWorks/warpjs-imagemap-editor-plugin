const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./index');

const expect = testHelpers.expect;

describe("index", () => {
    it("should expose a function", () => {
        expect(moduleToTest).to.be.a('function');
    });
});
