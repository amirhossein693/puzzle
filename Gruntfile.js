module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
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

  // task(s).
  grunt.registerTask('build', [ 'jshint', 'uglify']);
  grunt.registerTask('serve', ['jshint']);  

};