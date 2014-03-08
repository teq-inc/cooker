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
      
    // lessをpureとminifyでcssにコンパイル
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
          sourceMapFilename: '<%= pkg.docs %>/assets/css/docs.css.map'
        },
        files: {
          '<%= pkg.docs %>/assets/css/docs.css': '<%= pkg.docs %>/assets/less/docs.less'
        } 
      },
      vendor: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['vendor.map'],
          sourceMapFilename: '<%= pkg.docs %>/assets/css/vendor.css.map'
        },
        files: {
          '<%= pkg.docs %>/assets/css/vendor.css': '<%= pkg.docs %>/assets/less/vendor.less'
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
          '<%= pkg.docs %>/assets/css/vendor.css': '<%= pkg.docs %>/assets/css/vendor.css',     
          '<%= pkg.docs %>/assets/css/docs.css': '<%= pkg.docs %>/assets/css/docs.css'
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
            '<%= pkg.docs %>/assets/css/docs.css'
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
      files: [
        'Gruntfile.js',
        'js',
      ],
      options: {
        browser: true,
        jshintrc: 'js/.jshintrc',
        reporter: require('jshint-stylish')
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
        dest: '<%= pkg.dist %>/css/'
      },
      js: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'js/<%= pkg.name %>.js',
          'js/<%= pkg.name %>.min.js'
        ],
        dest: '<%= pkg.dist %>/js/'
      },
      docsCss: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'css/<%= pkg.name %>.css',
          'css/<%= pkg.name %>.css.map'
        ],
        dest: '<%= pkg.docs %>/assets/css/'
      },
      docsJs: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: [
          'js/<%= pkg.name %>.js',
          'js/<%= pkg.name %>.min.js'
        ],
        dest: '<%= pkg.docs %>/assets/js/'
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
    
    livereloadx: {
      static: true,
      dir: '<%= pkg.public %>'
    },
    
    esteWatch: {
      options: {
        dirs: [
          '<%= pkg.docs %>/_layouts',
          '<%= pkg.docs %>/_includes',
          '<%= pkg.docs %>/_includes/javascript',
          '<%= pkg.docs %>/_includes/styles',
          'js',
          'less',
          'less/inc',
          '<%= pkg.docs %>/',
          '<%= pkg.docs %>/assets/less',
          '<%= pkg.docs %>/assets/less/inc',
          '<%= pkg.docs %>/assets/js'
        ],
        livereload: {
          enabled: false
        }
      },
      'html': function(filepath) { 
        return [
          'shell:jekyll_build',
          'notify:jekyll'
        ]
      },
      'js': function(filepath) { 
        return [ 
          'copy',
          'shell:jekyll_build',
          'jshint',
          'notify:jekyll'
        ] 
      },
      'less': function(filepath) { 
        return [
          'less',
          'usebanner',
          'copy',
          'shell:jekyll_build',
          'notify:jekyll'
        ] 
      }
    }    
    
  });
		
  grunt.loadNpmTasks('livereloadx');
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'livereloadx',
      'connect',
      'esteWatch'
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