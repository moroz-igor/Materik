'use strict';
/** gulp connection **/
var gulp = require('gulp'),
/** connection of gulp plugins **/
    gp = require('gulp-load-plugins')(),
/** automatic deleting files from build analogic src **/
    del = require('del'),
    browserSync = require('browser-sync').create();
var useref = require('gulp-useref'),
    rimraf = require('rimraf');


/** automatic  reloader of the browser **/
gulp.task('serve', function() {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: "./build"
        }
    });
});
/** automatic deleting files from build analogic src **/
gulp.task('deleting', function () {
  return del([
    'build/*.html',
    'build/css/*.css',
    '!build/css/bootstrap.min.css',
    'build/img/**/*.*'
    //'build/img/*'
  ]);
});
/** pug compile **/
gulp.task('pug', function() {
    return gulp.src('src/blocks/*.pug')
        .pipe(gp.plumber())
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('../server/build'))
        .on('end', browserSync.reload);
});
/** sass compile**/
gulp.task('sass', function() {
    return gulp.src('src/blocks/*.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.plumber())
        .pipe(gp.sass().on('error', gp.sass.logError))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))
        .on("error", gp.notify.onError({
            title: "style"
        }))
        //.pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(gulp.dest('../server/build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** sass-plagins compile**/
gulp.task('sass-plagins', function() {
    return gulp.src('src/sass-plagins/*.scss')
        .pipe(gp.sourcemaps.init())
        .pipe(gp.plumber())
        .pipe(gp.sass().on('error', gp.sass.logError))
        .pipe(gp.autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))
        .on("error", gp.notify.onError({
            title: "style"
        }))
        //.pipe(gp.csso())
        .pipe(gp.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(gulp.dest('../server/build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** connection of the js libs **/
gulp.task('scripts_lib', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gp.concat('libs.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(gulp.dest('../server/build/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
/** connection of the js files **/
gulp.task('scripts', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(gulp.dest('../server/build/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//copy images from 'src'  to 'build'
gulp.task('img', function() {
	return gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('../server/build/img'))
		.pipe(gulp.dest('build/img'));
});
//copy  fonts of 'src'  to 'build'
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('../server/build/fonts'))
		.pipe(gulp.dest('build/fonts'));
});

//copy svg fonts of 'src'  to 'build'
gulp.task('svg', function() {
	return gulp.src('src/svg/**/*.*')
		.pipe(gulp.dest('../server/build/svg'))
		.pipe(gulp.dest('build/svg'));
});
//copy bootstrap lib in 'src'  to 'build and server'
gulp.task('csslib', function() {
	return gulp.src('src/csslib/*.*')
		.pipe(gulp.dest('../server/build/css'))
		.pipe(gulp.dest('build/css'));
});

/** watcher for all files **/
gulp.task('watch', function() {
    gulp.watch('src/blocks/**/*.pug', gulp.series('pug'));
    gulp.watch('src/blocks/**/*.scss', gulp.series('sass'));
    gulp.watch('src/sass-plagins/*.scss', gulp.series('sass-plagins'));
    gulp.watch('src/scripts/**/*.js', gulp.series('scripts'));
    gulp.watch('src/blocks/*.pug', gulp.series('deleting'));
});
/** parallel connection of difrent tasks **/
gulp.task('default', gulp.series(
    gulp.parallel('pug', 'sass', 'sass-plagins', 'scripts_lib', 'scripts', 'deleting'),
    gulp.parallel('watch', 'serve', 'img','fonts', 'svg', 'csslib')
));
