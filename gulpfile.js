var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('watch', ['browserSync','sass',/*'browserify',*/'imgmin'], function() {
	gulp.watch('./src/sass/**/*.+(scss|sass)', ['sass']);
//	gulp.watch('./src/js/**/*.js', ['browserify']);
	gulp.watch('./src/img/**/*.+(gif|jpg|png|svg)', ['imgmin']);
	gulp.watch('./dist/*.html', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		port: 8080,
		browser: ['google chrome','firefox']
	});
});

gulp.task('sass', function() {
	return gulp.src('./src/sass/*.+(scss|sass)')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded',
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('imgmin', function() {
	return gulp.src('./src/img/*')
		.pipe(imagemin({
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('browserify', function () {
	return browserify('./src/js/scripts.js')
	.bundle()
	.pipe(source('scripts.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});