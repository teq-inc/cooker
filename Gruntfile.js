 module.exports = function(grunt) {
 
  "use strict";

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
        
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
      ' */\n',
        
    less:{
      cooker: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['<%= pkg.name %>.css.map'],
          sourceMapFilename: 'css/<%= pkg.name %>.css.map'
        },
        files: {
          'css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
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
      },
      vendor: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['vendor.map'],
          sourceMapFilename: 'docs/assets/css/vendor.css.map'
        },
        files: {
          'docs/assets/css/vendor.css': 'docs/assets/less/vendor.less'
        } 
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          'css/<%= pkg.name %>.min.css': 'less/<%= pkg.name %>.less'
        }
      },
    },
    
    // css成形
    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        files: {
          'css/<%= pkg.name %>.css': 'css/<%= pkg.name %>.css',
          'docs/assets/css/vendor.css': 'docs/assets/css/vendor.css',     
          'docs/assets/css/docs.css': 'docs/assets/css/docs.css'
        }
      }
    },    
      
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'css/<%= pkg.name %>.css',
            'docs/assets/css/docs.css'
          ]
        }
      }
    },
    
    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      src: [
        'css/<%= pkg.name %>.css',
        'css/<%= pkg.name %>.min.css'
      ]
    },

    // js結合、成形、圧縮
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
          'js/<%= pkg.name %>.js' : [
            'js/switchers.js'
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
          'js/<%= pkg.name %>.min.js' : ['js/<%= pkg.name %>.js' ]
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
          'js/<%= pkg.name %>.beautify.js' : ['js/<%= pkg.name %>.js' ]
        } 
      },
      compMinify:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
        },
        files :  { 
          'js/<%= pkg.name %>.beautify.min.js' : ['js/<%= pkg.name %>.beautify.js' ]
        } 
      },
    },
    
    jshint: {
      options: {
        jshintrc: 'js/.jshintrc',
        reporter: require('jshint-stylish')
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      js: {
        src: 'js/*.js'
      },
      assets: {
        src: 'docs/assets/js/common.js'
      }      
    },

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
    
    // html debug
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
        
    copy: {
      css: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'css/<%= pkg.name %>.css',
          'css/<%= pkg.name %>.min.css'
        ],
        dest: 'dist/css/'
      },
      js: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'js/<%= pkg.name %>.js',
          'js/<%= pkg.name %>.min.js'
        ],
        dest: 'dist/js/'
      },
      docsCss: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'css/<%= pkg.name %>.css',
          'css/<%= pkg.name %>.css.map'
        ],
        dest: 'docs/assets/css/'
      },
      docsJs: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'js/<%= pkg.name %>.js',
          'js/<%= pkg.name %>.min.js'
        ],
        dest: 'docs/assets/js/'
      }
    },
    
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
          
    notify: {
      options: {
        title: '<%= pkg.name %> Grunt Notify',
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
        
    shell: {
      jekyll_build: {
        command: 'jekyll build'
      },
      jekyll_rebuild: {
        command: 'jekyll build --future'
      }
    },
        
    watch: {
      js: {
        files: [
          '<%= jshint.js.src %>',
          '<%= jshint.assets.src %>'
        ],
        tasks: [
          'copy',
          'shell:jekyll_build',
          'jshint',
          'notify:jekyll'
        ],
        options: {
          livereload: true
        }
      },
      html: {
        files: [
          '<%= validation.files.src %>'
        ],
        tasks: [
          'shell:jekyll_build',
          'notify:jekyll'
        ],
        options: {
          livereload: true
        }
      },
      less: {
        files: [
          'less/*.less',
          'less/**/*.less'
        ],
        tasks: [
          'less',
          'usebanner',
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
		
  grunt.loadNpmTasks('livereloadx');
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'connect',
      'watch'
    ]);
  });

  grunt.registerTask('go', function () {
    grunt.log.warn('`grunt go` to start.');
    grunt.task.run([
      'bower:install',
      'test',
      'default'
    ]);
  });
  
  grunt.registerTask('test', function () {
    grunt.log.warn('`grunt test` to start.');
    grunt.task.run([
      'build',
      'jshint',
      'csslint',
      'validation'
    ]);
  });
  
  grunt.registerTask('build', function () {
    grunt.log.warn('`grunt build` to start.');
    grunt.task.run([
      'uglify',
      'less',
      'csscomb',
      'usebanner',
      'copy',
      'shell:jekyll_build',
      'htmlmin'
    ]);
  });
  
};