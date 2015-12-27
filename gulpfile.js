var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

gulp.task('watch', ['browserSync','sass'], function() {
	gulp.watch('libs/sass/**/*.+(scss|sass)', ['sass']);
	gulp.watch('public/*.html', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'public'
		},
		port: 8080,
		browser: ['google chrome','firefox']
	});
});

gulp.task('sass', function() {
	return gulp.src('libs/sass/**/*.+(scss|sass)')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});