module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
    },

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

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/',
          src: ['**', '!assets/js', '!assets/css'],
          dest: 'dest/'
        }],
      },
    },    

  });

  // module(s)
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // task(s).
  grunt.registerTask('build', [ 'jshint', 'uglify:build', 'cssmin:build', 'copy:build']);
  grunt.registerTask('serve', ['jshint']);  

};