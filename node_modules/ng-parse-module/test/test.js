var path = require('path');
var fs = require('fs');
var should = require('should');
var ngParseModule = require('../index');

it('parse app.js correctly', function () {

    var result = ngParseModule.parse('test/fixtures/app.js');

    result.should.have.property('name', 'test');
    result.dependencies.should.have.property('start',22);
    result.dependencies.should.have.property('end',72);
    result.dependencies.should.have.property('modules').with.lengthOf(4);
    result.contents.should.not.be.empty;

});

it('write out new dependencies correctly', function () {

    var result = ngParseModule.parse('test/fixtures/app.js');

    result.file = 'test/fixtures/app_new.js';
    result.dependencies.modules = ['\'newDep\'','newDep2'];
    result.save();

    var newContents = fs.readFileSync(result.file,'utf8');
    var compareTo = fs.readFileSync('test/fixtures/app_updated.js','utf8');

    newContents.should.equal(compareTo);

});
