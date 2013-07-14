module.exports = function(karma) {
  var config = {}
  config.plugins = [
    'karma-jasmine',
    'karma-coverage',
    'karma-spec-reporter',
    'karma-chrome-launcher',
    'karma-firefox-launcher',
  ];
  config.frameworks = ['jasmine']
  config.basePath  = '../';
  config.singleRun = false
  config.autoWatch = true
  config.colors    = true

  config.reporters = ['progress', 'coverage'];
  config.browsers = ['Chrome'];
  config.proxies = {
    '/': 'http://localhost:8000/'
  };

  config.files = [

    //3rd Party Code
    'app/lib/angular/angular.js',
    'app/lib/angular/*.js',

    //App-specific Code
    'app/js/*.js',
    'app/js/services/**/*.js',
    'app/js/directives/**/*.js',
    'app/js/controllers/**/*.js',
    'app/js/filters/**/*.js',
    
    // test code
    'app/js/**/test/unit/*.js'

  ];

  config.preprocessors = {
  '**/app/js/**/!(*Test).js': 'coverage'
  };

  karma.configure(config);
};
