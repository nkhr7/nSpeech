const gulp = require('gulp');
const plugins = require("gulp-load-plugins")({
  lazy:false,
  rename: { 'gulp-if': 'gulpif' }
});
const browserSync   = require('browser-sync');
const runSequence   = require('run-sequence');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-es').minify;
const Promise = require('promise');
const del = require('del');

const dir = {
  src: 'src',
  dist: 'dist',
  demo: 'demo'
};

const nSpeechPath = dir.src + '/js/nSpeech.js';
const nSpeechDistPath = dir.dist + '/nSpeech.js';

let publish = false;


gulp.task("browser-sync", function () {
  browserSync.init({
    server: { baseDir: dir.demo + '/' }
  });
});


gulp.task("reload", function () {
  browserSync.reload();
});


gulp.task('watch', function (cb) {

  runSequence(
    'build',
    'browser-sync',
    function () {
      gulp.watch([dir.demo + '/**/*.html'], ['reload']);

      gulp.watch([dir.demo + '/**/*.js'], ["reload"]);

      // javascriptの監視
      gulp.watch([nSpeechPath], ["build"]);
      gulp.watch([nSpeechDistPath], ["copy"]);
      return cb;
    }
  );
});

gulp.task('build', function () {
  return rollup.rollup({
    input: nSpeechPath
  }).then(function (bundle) {
    const amd = bundle.write({
      file: dir.dist + '/index.amd.js',
      format: "amd"
    });

    const cjs = bundle.write({
      file: dir.dist + '/index.js',
      format: "cjs"
    });

    const es = bundle.write({
      file: dir.dist + '/index.es.js',
      format: "es"
    });

    const iife = bundle.write({
      file: dir.dist + '/nSpeech.js',
      name: 'nSpeech',
      format: 'iife'
    });

    return Promise.all([amd, cjs, es, iife]);

  });
});

gulp.task('copy', function () {
  return gulp.src([nSpeechDistPath])
    .pipe(plugins.gulpif(
      publish,
        gulp.dest('./'),
        gulp.dest(dir.demo + '/js')
    ));
});

gulp.task('copy-index', function () {
  return gulp.src([dir.dist + '/index.js'])
    .pipe(plugins.gulpif(
      publish,
        gulp.dest('./')
    ));
});


gulp.task('jsmin', function () {
  return rollup.rollup({
    input: nSpeechPath,
    plugins: [uglify( { output: { comments: /^!/ } }, minify )]
  }).then(function (bundle) {
    const path = publish ? '.' : dir.dist;
    return bundle.write({
      file: path + '/nSpeech.min.js',
      name: 'nSpeech',
      format: "iife"
    });
  });
});

gulp.task('publish-build', function () {
  publish = true;
  return runSequence(['copy', 'copy-index', 'jsmin']);
});

gulp.task('publish-clean', function () {
  return del(['./nSpeech.js', './nSpeech.min.js', './index.js']);
});

gulp.task('lint', function () {
  return gulp.src([nSpeechPath])
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError());
});

// for npm publish
gulp.task('prepublish', function () { return runSequence(['publish-build']); });
gulp.task('publish', function () { return runSequence(['publish-clean']); });

gulp.task('default', ['watch']);

gulp.task('test', ['lint']);

gulp.task('dist', ['build', 'jsmin']);
