var gulp = require('gulp');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var coveralls = require('gulp-coveralls');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
    .pipe(less({
        //paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/css/hcas'));
});

gulp.task('jshint', function () {
	return gulp.src(['./src/**/*.js', './tests/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('istanbul', function () {
  return gulp.src('./src/*.js')
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

gulp.task('coveralls', ['mocha'], function() {
	return gulp.src('./tests/_coverage/lcov.info')
  		.pipe(coveralls());
});

gulp.task('watch', function () {
    watch(['./src/**/*.js', './tests/*.js'], batch(function (events, done) {
        gulp.start('jshint', done);
    }));
});

gulp.task('default', ['jshint', 'mocha']);
gulp.task('travis', ['jshint', 'coveralls']);