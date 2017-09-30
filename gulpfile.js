'use strict';

var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var browserSync   = require('browser-sync');
var runSequence   = require('run-sequence');//タスク直列処理

var autoprefixer_setting = {
  browsers: ['last 2 versions'],
  cascade: false
}

var dir = {
  src: 'src',
  dist: 'dist',
  demo: 'demo'
};

var nSpeech_path = dir.src + '/js/nSpeech.js';


gulp.task('sass', function () {
  return gulp.src([
    dir.demo + '/sass/**/*.scss'
  ])
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sass({outputStyle: 'nested'}).on('error', plugins.sass.logError))
  .pipe(plugins.autoprefixer(autoprefixer_setting))
  .pipe(plugins.sourcemaps.write())
  .pipe(gulp.dest(dir.demo))
  .pipe(browserSync.stream())
});


gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: dir.demo + '/' // ルートとなるディレクトリを指定
    }
  });
});


gulp.task("reload", function () {
  browserSync.reload();
});


gulp.task('watch', ['sass', 'copy-demo', 'browser-sync'], function() {

  gulp.watch([
    dir.demo + '/**/*.html'
  ],['reload']);

  gulp.watch([
    dir.demo + '/**/*.scss'
  ],['sass']);

  // javascriptの監視
  gulp.watch([nSpeech_path], ['copy-demo', 'reload']);
});


gulp.task('copy-demo', function() {
  return gulp.src([nSpeech_path])
  .pipe(gulp.dest(dir.demo + '/js'))
});


gulp.task('copy', function () {
  return gulp.src([nSpeech_path])
  .pipe(gulp.dest(dir.dist))
});


gulp.task('jsmin', function() {
  return gulp.src([nSpeech_path])
  .pipe(plugins.plumber())
  .pipe(plugins.uglify({ output: { comments: /^!/ } }))
  .pipe(plugins.rename({ extname: '.min.js' }))
  .pipe(gulp.dest(dir.dist))
});

gulp.task('jslint', function() {
  return gulp.src([nSpeech_path])
  .pipe(plugins.jslint())
});


gulp.task('default', ['watch']);

gulp.task('test', ['jslint']);

gulp.task('dist', function(callback) {
  runSequence(
    'copy',
    'jsmin',
    callback
  )
});