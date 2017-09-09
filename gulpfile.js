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

gulp.task('index', done => {
  gulp.src('src/index.html')
    .pipe(minifyHtml({
      empty: true,
      cdata: true,
      spare: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./build/'))
    .on('end', done)
})

gulp.task('css', done => {
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
    .on('end', done)
})

gulp.task('libJS', done => {
  gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-scroll/angular-scroll.min.js',
    './node_modules/angularjs-slider/dist/rzslider.min.js'
  ]).pipe(concat('lib.min.js'))
    .pipe(gulp.dest('./build/js/'))
    .on('end', done)
})

gulp.task('js', (done) => {
  gulp.src('./src/js/**/*.js')
    .pipe(babel({
      'presets': [
        ['es2015']
      ]
    }))
    // .pipe(minifyJs())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./build/js/'))
    .on('end', done)
})

gulp.task('locales', done => {
  gulp.src('./src/locales/**/*.json')
    .pipe(gulp.dest('./build/locales/'))
    .on('end', done)
})

gulp.task('img', done => {
  gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img/'))
    .on('end', done)
})

gulp.task('fonts', done => {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./build/fonts/'))
    .on('end', done)
})

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*', ['css'])
  gulp.watch('./src/js/**/*', ['js'])
  gulp.watch('./src/locales/**/*.json', ['locales'])
  gulp.watch('./src/index.html', ['index'])
  gulp.watch('./src/img/**/*', ['img'])
})

gulp.task('build', ['index', 'css', 'libJS', 'js', 'locales', 'img', 'fonts'])

gulp.task('build-watch', ['build', 'watch'])

gulp.task('default', ['build'])
