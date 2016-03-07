'use strict';
var _ = require('lodash');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous ' + chalk.red('generator-sequence-diagram') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your sequence diagrams name',
      default: this.appname.replace(/^sequence ?/, '')
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    // dot
    this.fs.copy(
      this.templatePath('dot/editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('dot/gitignore'),
      this.destinationPath('.gitignore')
    );
    // copy
    this.fs.copy(
      this.templatePath('copy/**/*'),
      this.destinationPath('')
    );
    // tpl
    this.fs.copyTpl(
      this.templatePath('tpl/**/*'),
      this.destinationPath(''),
      { name: _.kebabCase(this.props.name) }
    );
  },

  install: function () {
    this.npmInstall();
  }
});
