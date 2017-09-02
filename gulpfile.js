/**
 * Created by romanskisils on 28/11/2016.
 */
'use strict'

const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const minifyCss = require('gulp-cssnano')
const minifyJs = require('gulp-uglify')
const minifyHtml = require('gulp-htmlmin')
const merge = require('merge-stream')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')

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
  const compiledSass = gulp.src('src/scss/style.scss')
    .pipe(sass())

  const cssLibs = gulp.src([
    './node_modules/angularjs-slider/dist/rzslider.min.css'
  ])

  merge(compiledSass, cssLibs)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('libJS', function () {
  gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-scroll/angular-scroll.min.js',
    './node_modules/angularjs-slider/dist/rzslider.min.js'
  ]).pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('js', (done) => {
  gulp.src('./src/js/**/*.js')
    .pipe(babel({
      'presets': [
        ['es2015']
      ]
    }))
    .pipe(minifyJs())
    .pipe(concat('main.min.js'))
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

gulp.task('build', ['index', 'css', 'libJS', 'js', 'img', 'fonts'])

gulp.task('build-watch', ['build', 'watch'])

gulp.task('default', ['build'])
