'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var angularOneUtils = require('../utils.js');
var _ = require('underscore');
var chalk = require('chalk');
var fs = require('fs');
var url = require('url');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var PartialGenerator = module.exports = function PartialGenerator(args, options, config) {

    angularOneUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(PartialGenerator, yeoman.generators.Base);

PartialGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            name: 'route',
            message: 'Enter the route url (i.e. /mypartial/:id).  If you don\'t want a route added for you, leave this empty.'
        }
    ];

    angularOneUtils.addNamePrompt(this,prompts,'partial');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        this.route = url.resolve('',props.route);
        angularOneUtils.askForModuleAndDir('partial',this,true,cb);
    }.bind(this));
};

PartialGenerator.prototype.files = function files() {

    this.ctrlname = _.camelize(_.classify(this.name)) + 'Ctrl';

    angularOneUtils.processTemplates(this.name,this.dir,'partial',this,null,null,this.module);

    if (this.route && this.route.length > 0){
        var partialUrl = this.dir + this.name + '.html';
        angularOneUtils.injectRoute(this.module.file,this.config.get('uirouter'),this.name,this.route,partialUrl,this);
    }

};
