'use strict';

const { series, parallel, src, dest } = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    browserSync = require("browser-sync"),
    pug = require("gulp-pug"),
    eslint = require('gulp-eslint'),
    pugLinter = require('gulp-pug-linter'),
    scsslint = require('gulp-scss-lint'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: ['src/style/main.scss'],
        img: 'src/img/**/*.*',
        fonts: 'src/font/**/*.*'
    },
    watch: {
        html: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/font/**/*.*'
    },
    clean: './build'
};

var config = {
    //proxy: 'test',
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

function html() {
    return src(path.src.html)
        .pipe(pugLinter({ reporter: 'default', failAfterError: false })) 
        .pipe(pug())
        .pipe(dest(path.build.html))
        .pipe(reload({ stream: true }));
}

function js() {
    return src(path.src.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.js))
        .pipe(reload({ stream: true }));
}

function css() {
    return src(path.src.style)
        .pipe(scsslint())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))
        .pipe(reload({ stream: true }));
}

function img() {
    return src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(dest(path.build.img))
        .pipe(reload({ stream: true }));
}

function font() {
    return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function webserver() {
    browserSync(config);
};

function build() {
    parallel(js, css, font, html, img);
}

function watch_all() {
    watch(path.watch.html, html);
    watch(path.watch.style, css);
    watch(path.watch.js, js);
    watch(path.watch.img, img);
    watch(path.watch.fonts, font);
}
    
exports.js = js;
exports.css = css;
exports.font = font;
exports.html = html;
exports.img = img;

exports.build = build;
exports.watch = watch_all;
exports.server = webserver;

exports.default = parallel(build, watch_all, webserver);


