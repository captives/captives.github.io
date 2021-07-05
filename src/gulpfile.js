'use strict';

// CSS编译
const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

//css
function compile() {
    return src(['./assets/themes-cayman/page.scss', './assets/themes-cayman/page-markdown.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        // .pipe(rename({ basename: 'page' }))
        .pipe(dest('./../public/css'));
}

//字体
function copyfont() {
    return src(['./assets/fonts/**'])
        .pipe(cssmin())
        .pipe(dest('./../public/fonts'));
}

exports.build = series(compile, copyfont); //copyfont