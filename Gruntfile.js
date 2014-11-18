module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/assets',
          src: ['js/**/*.js'],
          dest: 'dest/assets/',
          ext: '.min.js',
        }],  
      }
    },

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/assets',
          src: ['css/**/*.css'],
          dest: 'dest/assets/',
          ext: '.min.css',
        }],  
      }
    },

    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'app/assets/js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }

  });

  // module(s)
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // task(s).
  grunt.registerTask('build', [ 'jshint', 'uglify:build', 'cssmin:build']);
  grunt.registerTask('serve', ['jshint']);  

};