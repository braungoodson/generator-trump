'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slugify = require('underscore.string/slugify');
var camelize = require('underscore.string/camelize');
var humanize = require('underscore.string/humanize');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the supreme ' + chalk.red('Trump') + ' generator!'
    ));

    var prompts = [{
      name: 'dname',
      message: 'What is the name of your directive?',
      default: 'iu-selector'
    },{
      name: 'dpath',
      message: 'Where would you like to create this directive?',
      default: 'client/components/'
    },{
      type: 'confirm',
      name: 'dtemplateUrl',
      message: 'Does this directive need an external html file?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  makeDirective: function() {
    var dname = slugify(humanize(this.props.dname));
    this.fs.copyTpl(
      this.templatePath('_directive.js'),
      this.destinationPath('./'+this.props.dpath+dname+'/'+dname+'.directive.js'),
      { dname: camelize(dname),
        dpath: this.props.dpath,
        dtemplateUrl: this.props.dtemplateUrl,
        dtemplateUrlDigest: this.props.dpath+dname+'/'+dname+'.html'}
    );
    this.fs.copyTpl(
      this.templatePath('_directive.spec.js'),
      this.destinationPath('./'+this.props.dpath+dname+'/'+dname+'.directive.spec.js'),
      { dname: camelize(dname),
        dpath: this.props.dpath,
        dtemplateUrl: this.props.dtemplateUrl,
        dtemplateUrlDigest: this.props.dpath+dname+'/'+dname+'.html'}
    );
    this.fs.copyTpl(
      this.templatePath('_directive.html'),
      this.destinationPath('./'+this.props.dpath+dname+'/'+dname+'.html'),
      { dname: dname,
        dpath: this.props.dpath,
        dtemplateUrl: this.props.dtemplateUrl,
        dtemplateUrlDigest: this.props.dpath+dname+'/'+dname+'.html'}
    );
    this.fs.copyTpl(
      this.templatePath('_directive.scss'),
      this.destinationPath('./'+this.props.dpath+dname+'/_'+dname+'.scss'),
      { dname: dname,
        dpath: this.props.dpath,
        dtemplateUrl: this.props.dtemplateUrl,
        dtemplateUrlDigest: this.props.dpath+dname+'/'+dname+'.html'}
    );
  }

});
