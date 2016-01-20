module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'hcas/**/*.js', 'tests/**/*.js'],
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

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['mocha']);

};