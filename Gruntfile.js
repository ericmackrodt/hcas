module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        //separator: ';',
      },
      node: {
        src: ['hcas/hcas.node.js', 'hcas/hcas.js', 'hcas/hcas.utils.js', 'hcas/hcas.control.js', 'hcas/hcas.parser.js', 'hcas/Controls/*.js'],
        dest: '_build/hcas.build.js',
      } 
    },
    jshint: {
      files: ['Gruntfile.js', 'hcas/**/*.js'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['mocha']);

};