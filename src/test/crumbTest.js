const expect = require("chai").expect;
const moduleLoad = require('./moduleLoad');

var execute = moduleLoad('crumbHandler', 'src/main/crumb.js');

describe("Test crumbHandler", function() {
    it("Compile Crumb", function() {
        return execute.then(crumbHandler => {
            expect(crumbHandler).not.be.undefined;
        });
    });
    it("Crumb Default", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler();
            expect(crumb.name()).be.undefined;
            //expect(crumb.name()).to.equal("index");
            //expect(crumb.index).to.equal(true);
        });
    });
    it("Crumb other", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('other');
            expect(crumb.name()).to.equal("other");
            expect(crumb.other).to.equal(true);
        });
    });
    it("Crumb open A", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('other');
            crumb.open('A');
            expect(crumb.name()).to.equal("A");
            expect(crumb.A).to.equal(true);
        });
    });
    it("Crumb open A->B->C", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('A');
            crumb.open('B');
            crumb.open('C');
            expect(crumb.name()).to.equal("C");
            expect(crumb.C).to.equal(true);
        });
    });
    it("Crumb open A->B->C->D->E go(2)", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('A');
            crumb.open('B');
            crumb.open('C');
            crumb.open('D');
            crumb.open('E');
            crumb.go(2);
            expect(crumb.name()).to.equal("C");
            expect(crumb.C).to.equal(true);
        });
    });
    it("Crumb open A->B->C->D->E go(0)", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('A');
            crumb.open('B');
            crumb.open('C');
            crumb.open('D');
            crumb.open('E');
            crumb.go(0);
            expect(crumb.name()).to.equal("A");
            expect(crumb.A).to.equal(true);
        });
    });
    it("Crumb open A->B->C <- <-", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler('A');
            crumb.open('B');
            crumb.open('C');
            crumb.back();
            crumb.back();
            expect(crumb.name()).to.equal("A");
            expect(crumb.A).to.equal(true);
        });
    });
    it("Crumb open A <- <- <-", function() {
        return execute.then(crumbHandler => {
            let crumb = crumbHandler();
            crumb.open('A');
            crumb.back();
            crumb.back();
            crumb.back();
            crumb.back();
            expect(crumb.name()).to.equal("A");
            expect(crumb.A).to.equal(true);
        });
    });
});