module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				//separator: ';',
			},
			node: {
				src: ['src/hcas.node.js', 'src/hcas.js', 'src/hcas.htmlBuilder.js', 'src/hcas.utils.js', 'src/hcas.control.js', 'src/hcas.parser.js', 'src/Controls/*.js'],
				dest: '_build/hcas.node.js',
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
		mocha_istanbul: {
			coverage: {
				src: 'tests', // the folder, not the files
				options: {
					coverageFolder: '_coverage',
					mask: '**/*tests.js',
					root: '_build/'
				}
			},
			coveralls: {
				src: ['tests'], // multiple folders also works
				options: {
					coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
					coverageFolder: '_coverage',
					check: {
						lines: 50,
						statements: 50
					},
					root: '_build/', // define where the cover task should consider the root of libraries that are covered by tests
					reportFormats: ['cobertura','lcovonly']
				}
			}
		}
	});

	grunt.event.on('coverage', function(lcov, done) {
		require('coveralls').handleInput(lcov, function(err) {
			if (err) {
				return done(err);
			}
			done();
		});
	});


	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-mocha-istanbul');

	grunt.registerTask('default', ['jshint', 'concat', 'mocha_istanbul:coverage']);
	grunt.registerTask('travis', ['jshint', 'concat', 'mocha_istanbul:coveralls']);

	grunt.registerTask('test', ['mocha_istanbul:coverage']);
	grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
};