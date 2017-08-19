/**
 * Created by romanskisils on 28/11/2016.
 */
'use strict'

var gulp = require('gulp')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var minifyCss = require('gulp-cssnano')
var minifyJs = require('gulp-uglify')
var minifyHtml = require('gulp-htmlmin')
var merge = require('merge-stream')
var imagemin = require('gulp-imagemin')

gulp.task('index', function () {
  gulp.src('src/index.html')
    .pipe(minifyHtml({
      empty: true,
      cdata: true,
      spare: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('css', function () {
  var compiledSass = gulp.src('src/scss/style.scss')
    .pipe(sass())

  var cssLibs = gulp.src([
    './node_modules/angularjs-slider/dist/rzslider.min.css'
  ])

  merge(compiledSass, cssLibs)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('js', function () {
  gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-scroll/angular-scroll.min.js',
    './node_modules/angularjs-slider/dist/rzslider.min.js',
    './src/js/**/*.js'
  ]).pipe(concat('main.min.js'))
    .pipe(minifyJs())
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('img', function (done) {
  gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('fonts', function (done) {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*', ['css'])
  gulp.watch('./src/js/**/*', ['js'])
  gulp.watch('./src/index.html', ['index'])
  gulp.watch('./src/img/**/*', ['img'])
})

gulp.task('build', ['index', 'css', 'js', 'img', 'fonts'])

gulp.task('build-watch', ['build', 'watch'])

gulp.task('default', ['build'])
