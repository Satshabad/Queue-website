module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  karma: {
    unit: {
      configFile: 'config/karma.conf.js',
      background : true
    }
  }

  watch: {
    //run unit tests with karma (server needs to be already running)
    karma: {
      files: ['app/js/**/*.js', 'test/browser/**/*.js'],
      tasks: ['karma:unit:run'] //NOTE the :run flag
    }
  }

};
