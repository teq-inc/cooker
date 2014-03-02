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
      develop: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'css/<%= pkg.name %>.css.map'
        },
        files: {
          'css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'        
        } 
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          'css/<%= pkg.name %>-min.css': 'less/<%= pkg.name %>.less'        
        }
      },
    },
    
    // css成形
    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      dist: {
        files: {
          'css/<%= pkg.name %>.css': 'css/<%= pkg.name %>.css',
        }
      }
    },    
      
    // コンパイルしたcssにバナー追加
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'css/<%= pkg.name %>.css',
          ]
        }
      }
    },
    
    // cssデバッグ
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: [
        'css/<%= pkg.name %>.css',
        'css/<%= pkg.name %>-min.css'
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
            'js/tooltips.js',
            'js/switcher.js',
            'js/slidebar.js',
            'js/inputcounter.js',
            'js/scrollmethod.js'
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
          'js/<%= pkg.name %>-min.js' : ['js/<%= pkg.name %>.js' ]
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
          'js/<%= pkg.name %>-beautify.js' : ['js/<%= pkg.name %>.js' ]
        } 
      },
      compMinify:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
        },
        files :  { 
          'js/<%= pkg.name %>-beautify-min.js' : ['js/<%= pkg.name %>-beautify.js' ]
        } 
      },
    },
    
    //js debug
    jshint: {
      files: [
        'Gruntfile.js',
        'js',
      ],
      options: {
        browser: true,
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // html圧縮
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
        
    // ファイルコピー
    copy: {
      css: {
        expand: true,
        src: [
          'css/<%= pkg.name %>.css',
          'css/<%= pkg.name %>-min.css'
        ],
        dest: '<%= pkg.dist %>/css/',
        flatten: true,
        filter: 'isFile'
      },
      js: {
        expand: true,
        src: [
          'js/<%= pkg.name %>.js',
          'js/<%= pkg.name %>-min.js'
        ],
        dest: '<%= pkg.dist %>/js/',
        flatten: true,
        filter: 'isFile'
      },
    },
    
    // ローカルサーバー
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
          
    // 通知
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
    
    // bower インストール設定
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
          './*.html',
          '_layouts',
          '_includes',
          '_includes/js-components',
          '_includes/styles',
          'js',
          'less',
          'less/components',
          'less/js-components',
          'less/core',
          'less/layout',
          'less/utilities',
          'less/mixins',
          'less/variables',
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
          'shell:jekyll_build',
          'jshint',
          'notify:jekyll'
        ] 
      },
      'less': function(filepath) { 
        return [
          'less:develop',
          'notify:less',
          'usebanner',
          'shell:jekyll_build',
          'notify:jekyll'
        ] 
      }
    }    
    
  });
		
  //
  grunt.loadNpmTasks('livereloadx');
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'livereloadx',
      'connect',
      'esteWatch'
    ]);
  });

  //
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
  
  //
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
  
  //
};