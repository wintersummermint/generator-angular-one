'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var angularOneUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {

    angularOneUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ServiceGenerator, yeoman.generators.Base);

ServiceGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [];

    angularOneUtils.addNamePrompt(this,prompts,'service');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        angularOneUtils.askForModuleAndDir('service',this,false,cb);
    }.bind(this));     

};

ServiceGenerator.prototype.files = function files() {

    angularOneUtils.processTemplates(this.name,this.dir,'service',this,null,null,this.module);

};
