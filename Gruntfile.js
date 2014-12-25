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
          dot: true,
          extDot: 'last',
          cwd: 'app/assets',
          src: ['js/**/*.js'],
          dest: 'dest/assets/',
          ext: '.js'
        }]
      }
    },

    compass: {
      // This task requires you to have Ruby, Sass, and Compass >=1.0.1 installed.
      // Run "gem update --system && gem install compass --pre" (without quotes) in the command line
      // https://github.com/gruntjs/grunt-contrib-compass#compass-task
      build: {
        options: {
          sassDir: 'app/assets/scss/',
          cssDir: 'app/assets/css/',
          debugInfo: false,
          outputStyle: 'expanded',
          environment: 'production'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 15 version']
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'app/assets',
            src: ['css/**/*.css'],
            dest: 'app/assets/',
            ext: '.css'
          }
        ]
      }
    },    

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'app/assets',
          src: ['css/**/*.css'],
          dest: 'dest/assets/',
          ext: '.css'
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/',
          src: ['**/*', '!**/assets/js/**', '!**/assets/css/**', '!**/assets/scss/**'],
          dest: 'dest/'
        }]
      },
      serve: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app/',
          src: ['**/*', '!**/assets/scss/**'],
          dest: 'dest/'
        }]
      }
    },

    watch: {
      build: {
        files: ['app/assets/js/*.js','app/assets/scss/*.scss'],
        tasks: ['build']
      },
      serve: {
        files: ['**/*'],
        tasks: ['serve'],
        options: {
          spawn: false
        }
      }
    }
  });

  // module(s)
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // task(s).
  grunt.registerTask('build', [
                                'jshint',
                                'uglify:build',
                                'compass:build',
                                'autoprefixer:build',
                                'cssmin:build',
                                'copy:build',
                                'watch:build'
                              ]);

  grunt.registerTask('serve', [
                                'jshint',
                                'compass:build',
                                'autoprefixer:build',
                                'copy:serve',
                                'watch:serve'                                
                              ]);  

};