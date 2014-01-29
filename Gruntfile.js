 module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
        
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
      ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' */\n',
      
    // lessをpureとminifyでcssにコンパイル
    less:{
      pure: {
        options: {
          paths: [
            '<%= pkg.less %>/<%= pkg.name %>.less',
            '<%= pkg.less %>/**/*.less',
          ],
          report: 'min',
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= pkg.css %>/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= pkg.css %>/<%= pkg.name %>.css': '<%= pkg.less %>/<%= pkg.name %>.less'        
        } 
      },
      minify: {
        options: {
          paths: '<%= less.pure.options.paths %>',
          cleancss: true,
          report: 'min',
        },
        files: {
          '<%= pkg.css %>/<%= pkg.name %>.min.css': '<%= pkg.less %>/<%= pkg.name %>.less'        
        }
      },
    },
    
/*
    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: [
          '',
        ],
        dest: ''
      }
    },
*/
    
    // コンパイルしたcssにバナー追加
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '<%= pkg.css %>/<%= pkg.name %>.css',
            '<%= pkg.css %>/<%= pkg.name %>.min.css',
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
        '<%= pkg.css %>/<%= pkg.name %>.css',
      ]
    },

    //
    csscomb: {
      sort: {
        options: {
          config: '.csscomb.json'
        },
        files: {
          '<%= pkg.docs %>/<%= pkg.name %>.css': ['<%= pkg.docs %>/<%= pkg.name %>.css'],
        }
      }
    },

    // jsファイル結合しそのファイルにバナー追加
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: [ 
          '<%= pkg.libs %>/accordion.js',
          '<%= pkg.libs %>/drilldown.js',
          '<%= pkg.libs %>/inputcounter.js',
          '<%= pkg.libs %>/scrollmethod.js',
          '<%= pkg.libs %>/slidebar.js'
        ],
        dest: '<%= pkg.js %>/<%= pkg.name %>.js'
      }
    },    
    
    // jsファイル圧縮とバナー追加
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      build: {
        src: '<%= pkg.js %>/<%= pkg.name %>.js',
        dest: '<%= pkg.js %>/<%= pkg.name %>.min.js'
      }
    },
    
    //js debug
    jshint: {
      files: [
        'Gruntfile.js',
        '<%= pkg.libs %>',
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
          '<%= pkg.css %>/<%= pkg.name %>.css',
          '<%= pkg.css %>/<%= pkg.name %>.min.css'
        ],
        dest: '<%= pkg.dist %>/css/',
        flatten: true,
        filter: 'isFile'
      },
      js: {
        expand: true,
        src: [
          '<%= pkg.js %>/<%= pkg.name %>.js',
          '<%= pkg.js %>/<%= pkg.name %>.min.js'
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
          targetDir: '<%= pkg.docs %>/vendor',
          //layoutのパラメータ　'byType' or 'byComponent'
          //https://github.com/yatskevich/grunt-bower-task
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false
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
     // static: true,
      dir: '<%= pkg.public %>'
    },
    
    esteWatch: {
      options: {
        dirs: [
          '<%= pkg.docs %>',
          '<%= pkg.docs %>/_layouts',
          '<%= pkg.docs %>/_page',
          '<%= pkg.docs %>/_posts',
          '<%= pkg.js %>',
          '<%= pkg.css %>',
          '<%= pkg.less %>',
          '<%= pkg.less %>/components',
          '<%= pkg.less %>/core',
          '<%= pkg.less %>/layout',
          '<%= pkg.less %>/utilities',
          '<%= pkg.less %>/mixins',
          '<%= pkg.less %>/variables',
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
          'notify:jekyll'
        ] 
      },
      'less': function(filepath) { 
        return [
          'less:pure',
          'notify:less',
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
    grunt.log.warn('`grunt Bower` to start a install.');
    grunt.task.run([
      'bower:install',
      'build',
      'default'
    ]);
  });
  
  //
  grunt.registerTask('build', function () {
    grunt.log.warn('`grunt build` to start.');
    grunt.task.run([
      'concat', 
      //'jshint',
      'uglify',
      'less',
      'usebanner',
      'csscomb',
      //'csslint',
      'shell:jekyll_build',
      'copy',
      'htmlmin',
      'validation',
    ]);
  });
  
  //
};