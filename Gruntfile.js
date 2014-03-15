 module.exports = function(grunt) {
 
  "use strict";

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
        
    // Banner template
    // ====================================================
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * <%= pkg.url %>\n' +
      ' */\n',

    // File delete
    // ====================================================
    clean: {
      dist: [
        'dist', 
        'docs/dist',
        'docs/assets/css',
        'js/<%= pkg.name %>.beautify.js'
      ]
    },
    
    // Less compire
    // ====================================================
    less:{
      cooker: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['<%= pkg.name %>.css.map'],
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
        } 
      },
      docs: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['docs.css.map'],
          sourceMapFilename: 'docs/assets/css/docs.css.map'
        },
        files: {
          'docs/assets/css/docs.css': 'docs/assets/less/docs.less'
        } 
      }
    },

    // css autoprefixer
    // ====================================================
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      docs: {
        options: {
          map: true
        },
        src: 'docs/assets/css/docs.css'
      }
    },

    // css csscomb 成形
    // ====================================================
    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'dist/css/<%= pkg.name %>.css',
          'docs/assets/css/docs.css': 'docs/assets/css/docs.css'
        }
      }
    },    

    // css add banner
    // ====================================================
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/<%= pkg.name %>.css',
            'dist/css/<%= pkg.name %>.min.css',
            'docs/assets/css/docs.css'
          ]
        }
      }
    },
    
    // css minify
    // ====================================================
    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true,
          report: 'min',
          compatibility: 'ie8'
        },
        src: [
          'dist/css/<%= pkg.name %>.css'
        ],
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    },
    
    // css csslint
    // ====================================================
    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'dist/css/<%= pkg.name %>.css',
        'dist/css/<%= pkg.name %>.min.css'
      ]
    },

    // js uglify (結合、成形、圧縮)
    // ====================================================
    uglify: {
      develop:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          compress:false,
          indentLevel: 2,
          beautify: true
        },
        files :  { 
          'dist/js/<%= pkg.name %>.js' : [
            'js/switchers.js',
            'js/drawer.js'
           ]
        } 
      },
      minify:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          compress:false,
        },
        files :  { 
          'dist/js/<%= pkg.name %>.min.js' : ['dist/js/<%= pkg.name %>.js' ]
        } 
      },
      comp:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          indentLevel: 2,
          beautify: true
        },
        files :  { 
          'js/<%= pkg.name %>.beautify.js' : ['dist/js/<%= pkg.name %>.js' ]
        } 
      }
    },
    
    // js jshint
    // ====================================================
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc',
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      js: {
        src: 'dist/js/cooker.js'
      },
      assets: {
        src: 'docs/assets/js/common.js'
      }      
    },

    // html minify
    // ====================================================
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
            expand: true,
            cwd: '<%= pkg.public %>',
            src: '{,*/}*.html',
            dest: '<%= pkg.public %>'
        }]
      }
    },     
    
    // html validation check
    // ====================================================
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: [
          '<%= pkg.public %>/index.html',
          '<%= pkg.public %>/**/*.html'
        ]
      }
    },
    
    // html file copy
    // ====================================================
    copy: {
      docs: {
        expand: true,
        cwd: './dist',
        src: [
          'js/*.js',
          'css/*.css',
          'css/*.map'
        ],
        dest: 'docs/dist'
      }
    },
    
    // connect
    // ====================================================
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          base: '<%= pkg.public %>/',
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        },
        livereload: {
          options: {
            open: true,
          }
        }
      }
    },
    
    // notify
    // ====================================================
    notify: {
      options: {
        title: '<%= pkg.name %> Grunt Notify',
      },
      grunt:{
        options: {
          message: 'Grunt Success!',
        }
      },
      less:{
        options: {
          message: 'Less Compile Success!',
        }
      },
      jekyll:{
        options: {
          message: 'jekyll Compile Success!',
        }
      }
    },
    
    // Bower
    // ====================================================
    bower: {
      install: {
        options: {
          targetDir: 'vendor',
          //layoutのパラメータ　'byType' or 'byComponent'
          //https://github.com/yatskevich/grunt-bower-task
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: true
        }
      }
    },
    
    // Shell
    // ====================================================
    shell: {
      jekyll_build: {
        command: 'jekyll build'
      },
      jekyll_rebuild: {
        command: 'jekyll build --future'
      }
    },
    
    // File watch
    // ====================================================
    watch: {
      grunt: {
        files: [
          '<%= jshint.grunt.src %>'
        ],
        tasks: [
          'jshint:grunt',
          'notify:grunt'
        ]
      },
      js: {
        files: [
          '<%= jshint.assets.src %>',
          'js/*.js'
        ],
        tasks: [
          'uglify',
          'copy',
          'shell:jekyll_build',
          'jshint:js',
          'jshint:assets',
          'notify:jekyll'
        ],
        options: {
          livereload: true
        }
      },
      html: {
        files: [
          'docs/*.html',
          'docs/_includes/*.html',
          'docs/_includes/**/*.html',
          'docs/_layouts/*.html'
        ],
        tasks: [
          'shell:jekyll_build',
          //'validation',
          'notify:jekyll'
        ],
        options: {
          livereload: true
        }
      },
      less: {
        files: [
          'less/*.less',
          'less/**/*.less',
          'docs/assets/less/*.less',
          'docs/assets/less/**/*.less'
        ],
        tasks: [
          'less',
          'autoprefixer',
          //'csscomb',
          //'usebanner',
          //'cssmin',
          //'csslint',
          'copy',
          'shell:jekyll_build',
          'notify:jekyll'
        ],
        options: {
          livereload: true
        }
      }
    }  
    
  });

  // Default task
  // ====================================================
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'connect',
      'watch'
    ]);
  });
  
  // Go task
  // ====================================================
  grunt.registerTask('go', function () {
    grunt.log.warn('`grunt go` to start.');
    grunt.task.run([
      'clean',
      'bower:install',
      'test',
      'default'
    ]);
  });
  
  // Test task
  // ====================================================
  grunt.registerTask('test', function () {
    grunt.log.warn('`grunt test` to start.');
    grunt.task.run([
      'build',
      'jshint',
      'csslint',
      'validation'
    ]);
  });
  
  // Build task
  // ====================================================
  grunt.registerTask('build', function () {
    grunt.log.warn('`grunt build` to start.');
    grunt.task.run([
      'uglify',
      'less',
      'autoprefixer',
      'csscomb',
      'usebanner',
      'cssmin',
      'copy',
      'shell:jekyll_build',
      'htmlmin'
    ]);
  });
  
};