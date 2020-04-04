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

const index = () => gulp.src('src/index.html')
  .pipe(minifyHtml({
    empty: true,
    cdata: true,
    spare: true,
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('./dist/'))

const css = () => {
  const compiledSass = gulp.src('src/scss/style.scss')
    .pipe(sass())

  const cssLibs = gulp.src([
    './node_modules/angularjs-slider/dist/rzslider.min.css'
  ])

  return merge(compiledSass, cssLibs)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./dist/css/'))
}

const libJS = () => gulp.src([
  './node_modules/angular/angular.min.js',
  './node_modules/angular-scroll/angular-scroll.min.js',
  './node_modules/angularjs-slider/dist/rzslider.min.js'
]).pipe(concat('lib.min.js'))
  .pipe(gulp.dest('./dist/js/'))


const js = () => gulp.src('./src/js/**/*.js')
.pipe(babel({
  'presets': [
    ['@babel/env']
  ]
}))
.pipe(minifyJs())
.pipe(concat('main.min.js'))
.pipe(gulp.dest('./dist/js/'))


const img = () => gulp.src('./src/img/**/*')
.pipe(imagemin())
.pipe(gulp.dest('./dist/img/'))

const fonts = () => gulp.src('./src/fonts/**/*')
.pipe(gulp.dest('./dist/fonts/'))

exports.default = gulp.parallel(index, css, libJS, js, img, fonts)