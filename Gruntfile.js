module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        //separator: ';',
      },
      node: {
        src: ['src/hcas.node.js', 'src/hcas.js', 'src/hcas.htmlBuilder.js', 'src/hcas.utils.js', 'src/hcas.control.js', 'src/hcas.parser.js', 'src/Controls/*.js'],
        dest: '_build/hcas.build.js',
      } 
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    mocha: {
      all: {
        src: ['tests/tests.html'],
        dest: './tests/output/xunit.out',
        options: {
          reporter: 'Nyan',
          log: true,
          run: true,
          logErrors: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: [
            function(){ hcas=require('./_build/hcas.build.js'); },
            function(){ chai=require('chai'); }
          ]
        },
        src: ['tests/*tests.js']
      }
    },
    mocha_istanbul: {
    coverage: {
          src: 'tests', // the folder, not the files
          options: {
              coverageFolder: 'coverage',
              mask: '**/*.tests.js',
              root: '_build/'
              }
          }
      }
  });

   grunt.event.on('coverage', function(lcovFileContents, done){
        //hcas=require('./_build/hcas.build.js');
        chai=require('chai');
        // Check below on the section "The coverage event"
        done();
    });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.registerTask('default', ['jshint']);
  //grunt.registerTask('test', ['mocha']);
  grunt.registerTask('travis', ['jshint', 'concat', 'mochaTest']);

  grunt.registerTask('test', [
        'mocha_istanbul:coverage'
    ]);

};