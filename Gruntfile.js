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
      ' */\n',
      
    // lessをpureとminifyでcssにコンパイル
    less:{
      develop: {
        options: {
          //strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= pkg.src %>/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= pkg.src %>/css/<%= pkg.name %>.css': '<%= pkg.src %>/less/<%= pkg.name %>.less'        
        } 
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min',
        },
        files: {
          '<%= pkg.src %>/css/<%= pkg.name %>.min.css': '<%= pkg.src %>/less/<%= pkg.name %>.less'        
        }
      },
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
            '<%= pkg.src %>/css/<%= pkg.name %>.css',
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
        '<%= pkg.src %>/css/<%= pkg.name %>.css',
      ]
    },

    // jsを結合、成形、圧縮
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
          '<%= pkg.src %>/js/<%= pkg.name %>.js' : [
            '<%= pkg.src %>/js/switcher.js',
            '<%= pkg.src %>/js/slidebar.js',
            '<%= pkg.src %>/js/inputcounter.js'
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
          '<%= pkg.src %>/js/<%= pkg.name %>.min.js' : ['<%= pkg.src %>/js/<%= pkg.name %>.js' ]
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
          '<%= pkg.src %>/js/<%= pkg.name %>.beautify.js' : ['<%= pkg.src %>/js/<%= pkg.name %>.js' ]
        } 
      },
      compMinify:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
        },
        files :  { 
          '<%= pkg.src %>/js/<%= pkg.name %>.beautify.min.js' : ['<%= pkg.src %>/js/<%= pkg.name %>.beautify.js' ]
        } 
      },
    },
    
    //js debug
    jshint: {
      files: [
        'Gruntfile.js',
        '<%= pkg.src %>/js',
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
          '<%= pkg.src %>/css/<%= pkg.name %>.css',
          '<%= pkg.src %>/css/<%= pkg.name %>.min.css'
        ],
        dest: '<%= pkg.dist %>/css/',
        flatten: true,
        filter: 'isFile'
      },
      js: {
        expand: true,
        src: [
          '<%= pkg.src %>/js/<%= pkg.name %>.js',
          '<%= pkg.src %>/js/<%= pkg.name %>.min.js'
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
          targetDir: '<%= pkg.src %>/vendor',
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
          '<%= pkg.src %>',
          '<%= pkg.src %>/_layouts',
          '<%= pkg.src %>/_page',
          '<%= pkg.src %>/_posts',
          '<%= pkg.src %>/js',
          '<%= pkg.src %>/less',
          '<%= pkg.src %>/less/components',
          '<%= pkg.src %>/less/js-components',
          '<%= pkg.src %>/less/core',
          '<%= pkg.src %>/less/layout',
          '<%= pkg.src %>/less/utilities',
          '<%= pkg.src %>/less/mixins',
          '<%= pkg.src %>/less/variables',
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
      'uglify',
      'less',
      'usebanner',
      'jshint',
      //'csslint',
      'shell:jekyll_build',
      'copy',
      //'htmlmin',
      //'validation',
    ]);
  });
  
  //
};