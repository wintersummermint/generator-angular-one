'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularOneUtils = require('../utils.js');

var angularOneGenerator = module.exports = function angularOneGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.config.set('partialDirectory','app/');
        this.config.set('modalDirectory','app/');
        this.config.set('directiveDirectory','app/');
        this.config.set('filterDirectory','app/');
        this.config.set('serviceDirectory','app/');
        this.config.set('controllerDirectory','app/');
        var inject = {
            js: {
                file: 'index.html',
                marker: angularOneUtils.JS_MARKER,
                template: '<script src="<%= filename %>"></script>'
            },
            less: {
                relativeToModule: true,
                file: '<%= module %>.less',
                marker: angularOneUtils.LESS_MARKER,
                template: '@import "<%= filename %>";'
            }
        };
        this.config.set('inject',inject);
        this.config.save();
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(angularOneGenerator, yeoman.generators.Base);

angularOneGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'appname',
        message: 'Project name : (app/projectname)',
        default: path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
        this.appname = props.appname;
        cb();
    }.bind(this));
};

angularOneGenerator.prototype.askForUiRouter = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'router',
        type:'list',
        message: 'Choose a router you wish to use : ',
        default: 1,
        choices: ['Standard ngRouter','Angular UI Router']
    }];

    this.prompt(prompts, function (props) {
        if (props.router === 'Angular UI Router') {
            this.uirouter = true;
            this.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
            this.routerModuleName = 'ui.router';
            this.routerViewDirective = 'ui-view';
        } else {
            this.uirouter = false;
            this.routerJs = 'bower_components/angular-route/angular-route.js';
            this.routerModuleName = 'ngRoute';
            this.routerViewDirective = 'ng-view';
        }
        this.config.set('uirouter',this.uirouter);
        cb();
    }.bind(this));
};

angularOneGenerator.prototype.app = function app() {
    this.directory('skeleton/','./');
};
