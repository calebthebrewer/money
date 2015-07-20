'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var csslint = require('gulp-csslint');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var bower = require('main-bower-files');
var concat = require('gulp-concat');
var html2js = require('gulp-ng-html2js');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');

var dev = 'client/development';
var prod = 'client/production';

var htmlFiles = dev + '/index.html';
var templateFiles = dev + '/**/*.tpl.html';
var sassFiles = dev + '/**/*.scss';
var jsFiles = [
    dev + '/**/*.module.js',
    dev + '/**/*.js'
  ];
var allJsFiles = jsFiles.concat('server/**/*.js');

var vendorJsFiles = [
  './bower_components/marked/marked.min.js',
  './node_modules/socket.io-client/socket.io.js'
];
var vendorFontFiles = [
  './bower_components/bootstrap/fonts/*.*'
];

gulp.task('watch', function() {
  gulp.watch(sassFiles, ['sass']);
  gulp.watch(jsFiles, ['js']);
  gulp.watch(htmlFiles, ['html']);
  gulp.watch(templateFiles, ['templates']);
  gulp.watch(allJsFiles, ['lint']);
});

gulp.task('lint', function() {
  return gulp.src(allJsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('run', function() {
  return nodemon({script: 'server.js', ext: 'js'});
});

gulp.task('sass', function() {
  return gulp.src(sassFiles)
    .pipe(sass())
    .pipe(csslint({
      'adjoining-classes': false,
      'box-model': false
    }))
    .pipe(csslint.reporter())
    .pipe(concat("app.css"))
    .pipe(gulp.dest(prod));
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(sourcemaps.init())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(prod));
});

gulp.task('html', function() {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest(prod));
});

gulp.task('templates', function() {
  return gulp.src(templateFiles)
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(html2js({
      moduleName: "templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest(prod));
});

gulp.task('vendor', function() {
  gulp.src(bower('**/*.css'))
    .pipe(concat('vendor.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(prod + '/vendor'));
  gulp.src(vendorJsFiles.concat(bower('**/*.js')))
    .pipe(concat('vendor.js'))
//     .pipe(uglify())
    .pipe(gulp.dest(prod + '/vendor'));
  gulp.src(bower('**/fonts/**/*.*').concat(vendorFontFiles))
    .pipe(gulp.dest(prod + '/fonts'));
});

gulp.task('clean', function() {
  return gulp.src(prod, {read: false})
    .pipe(clean());
});

gulp.task('default', ['build', 'watch']);
gulp.task('dev', ['run', 'lint', 'build', 'watch']);
gulp.task('build', ['js', 'html', 'templates', 'sass', 'vendor', 'lint']);
