'use strict';

var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});
var browserSync   = require('browser-sync');
var runSequence   = require('run-sequence');//タスク直列処理
var rollup = require('rollup');
var uglify = require('rollup-plugin-uglify');
var Promise = require('promise');
var del = require('del');

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
var nSpeech_dist_path = dir.dist + '/nSpeech.js';


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


gulp.task('watch', function(cb) {

  runSequence(
    'sass',
    'build',
    'browser-sync',
    function () {
      gulp.watch([
        dir.demo + '/**/*.html'
      ],['reload']);

      gulp.watch([
        dir.demo + '/**/*.scss'
      ],['sass']);

      gulp.watch([
        dir.demo + '/**/*.js'
      ], ["reload"]);

      // javascriptの監視
      gulp.watch([nSpeech_path], ["build"]);
      gulp.watch([nSpeech_dist_path], ["copy-demo"]);
      return cb;
    }
  );
});

gulp.task('build', function() {
  return rollup.rollup({
    input: nSpeech_path
  }).then(function(bundle) {
    var amd = bundle.write({
      file: dir.dist + '/index.amd.js',
      format: "amd"
    });

    var cjs = bundle.write({
      file: dir.dist + '/index.js',
      format: "cjs"
    });

    var es = bundle.write({
      file: dir.dist + '/index.es.js',
      format: "es"
    });

    var iife = bundle.write({
      file: dir.dist + '/nSpeech.js',
      name: 'nSpeech',
      format: 'iife'
    });

    return Promise.all([amd, cjs, es, iife]);
  });
});


gulp.task('copy-demo', function() {
  return gulp.src([nSpeech_dist_path])
  .pipe(gulp.dest(dir.demo + '/js'))
});

gulp.task('jsmin', function() {
  return rollup.rollup({
    input: nSpeech_path,
    plugins: [uglify({ output: { comments: /^!/ } })]
  }).then(function(bundle) {
    return bundle.write({
      file: dir.dist + '/nSpeech.min.js',
      name: 'nSpeech',
      format: "iife"
    });
  });
});

gulp.task('lint', function() {
  return gulp.src([nSpeech_path])
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError());
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('prepublish', function () { return runSequence(['clean', 'build']) });

gulp.task('default', ['watch']);

gulp.task('test', ['lint']);

gulp.task('dist', ['build', 'jsmin']);
