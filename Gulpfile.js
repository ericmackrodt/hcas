var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var concat = require('gulp-concat');
var coveralls = require('gulp-coveralls');

gulp.task('jshint', function () {
	return gulp.src(['Gulpfile.js', './src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('istanbul', function () {
  return gulp.src(['./_build/hcas.node.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['istanbul'], function () {
	return gulp.src('./tests/*.tests.js')
        .pipe(mocha({ 
            reporter: 'nyan',
		}))
        .pipe(istanbul.writeReports({
        	dir: './tests/_coverage',
        	reporters: ['lcov', 'json', 'text', 'text-summary'],
        	reportOpts: { dir: './tests/_coverage' }
        }))
        .pipe(istanbul.enforceThresholds({ 
            thresholds: { 
                global: 30 
            } 
        }));
});

gulp.task('concat', function () {
	return gulp.src('src/**/*.js')
        .pipe(concat('hcas.node.js'))
        .pipe(gulp.dest('./_build'));
});

gulp.task('coveralls', function() {
	return gulp.src('./tests/_coverage/lcov.info')
  		.pipe(coveralls());
});

gulp.task('default', ['jshint', 'concat', 'mocha']);
gulp.task('travis', ['jshint', 'mocha', 'coveralls']);