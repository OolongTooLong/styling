// https://github.com/thecodercoder/frontend-boilerplate/blob/master/gulpfile.js
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {gulp, series, watch, src, dest, parallel} = require("gulp")
/******** Import Gulp plugins.*********/
const autoprefixer = require('autoprefixer');
const babel = require("gulp-babel")
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const notify = require('gulp-notify');
const plumber = require("gulp-plumber")
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const mysqlDump = require('mysqldump');

/******** Error Reporting  *********/
let onError = function (err) {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Basso"
    })(err);
    this.emit('end');
};

/******** Directory Mapping *********/

const sassPath = {
    src: `scss/global.scss`,
    dest: `css`
}
const sassPathLayouts = {
    src: `scss/_layouts/*.scss`,
    dest: `css`
}

const jsPath = {
    src: `js/_components/*.js`,
    dest: `js`
};

/******** JavaScript Tasks *********/
function jsDeps(done) {
    const files = [
        "node_modules/jquery/dist/jquery.min.js",
        "js/_vendor/modernizr-3.11.2.min.js",
        "node_modules/packery/dist/packery.pkgd.js",
        // "node_modules/slick-carousel/slick/slick.js",
        // "node_modules/gsap/dist/gsap.min.js",
        // "node_modules/gsap/dist/ScrollTrigger.js",
        // "node_modules/gsap/dist/CSSRulePlugin.js",
        // "node_modules/gsap/dist/Draggable.js",
        // "node_modules/gsap/dist/InertiaPlugin.js",
        // "node_modules/gsap/dist/ScrollToPlugin.js",


        // "node_modules/barba.js/dist/barba.min.js",
        // "js/_vendor/jquery.ihavecookies.min.js",
        // "js/_vendor/gsap.min.js",
        // "js/_vendor/Draggable.min.js",
        "js/_vendor/InertiaPlugin.min.js",
        // "js/_vendor/ScrollSmoother.min.js",
        // "js/_vendor/ScrollToPlugin.min.js",
        // "js/_vendor/ScrollTrigger.min.js",
        "js/_vendor/SplitText.min.js",
        "js/_vendor/jquery.magnific-popup.js",
        "js/_vendor/plyr.js",
        "js/_vendor/jquery-ui.js",
    ]
    return (
        src(files)
            .pipe(plumber({errorHandler: onError}))
            .pipe(concat("main.deps.js"))
            .pipe(dest("./tmp"))
    )
}

function jsBuild(done) {
    return (
        src(jsPath.src)
            .pipe(plumber({errorHandler: onError}))
            .pipe(concat("main.build.js"))
            .pipe(babel({presets: [["@babel/env", {modules: false}]]}))
            .pipe(dest("./tmp"))
    )
}

function jsConcat(done) {
    const files = ["./tmp/main.deps.js", "./tmp/main.build.js"]
    return (
        src(files)
            .pipe(plumber({errorHandler: onError}))
            .pipe(concat("scripts.min.js"))
            // .pipe(uglify())
            .pipe(dest(jsPath.dest))
    )
}
let jsTasks = series(jsDeps, jsBuild, jsConcat)
exports.js = jsTasks



/******** SCSS Tasks *********/

sass.compiler = require('sass');
function scssTask() {
    return src(sassPath.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        // .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(rename('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(sassPath.dest))
}
exports.scss = scssTask

function scssLayoutTask() {
    return src(sassPathLayouts.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        // .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(rename('layouts.css'))
        .pipe(dest(sassPath.dest))
}
exports.scssLayout = scssLayoutTask

function sassColourTask() {
    return src('scss/_utilities/_generator/_colour/index.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        // .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(rename('colour.css'))
        .pipe(dest(sassPath.dest))
}
exports.sassColour = sassColourTask

function sassSpacingTask() {
  return src('scss/_utilities/_generator/_spacing/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(rename('spacing.css'))
    .pipe(dest(sassPath.dest))
}
exports.sassSpacing = sassSpacingTask

function sassFontTask() {
  return src('scss/_base/_fonts/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(rename('fonts.css'))
    .pipe(dest(sassPath.dest))
}
exports.sassFont = sassFontTask

function sassGridTask() {
  return src('scss/_base/_grid/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(rename('grid.css'))
    .pipe(dest(sassPath.dest))
}
exports.sassGrid = sassGridTask

function sassButtonTask() {
  return src('scss/_components/_buttons/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(rename('buttons.css'))
    .pipe(dest(sassPath.dest))
}
exports.sassButton = sassButtonTask

function sassAlignTask() {
  return src('scss/_components/_alignment/index.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([ autoprefixer(), cssnano() ]))
    .pipe(rename('align.css'))
    .pipe(dest(sassPath.dest))
}
exports.sassAlign = sassAlignTask

function scssProd() {
    return src(sassPath.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.css'))
        .pipe(dest(sassPath.dest))
}

exports.scssProd = scssProd

/******** Watch Tasks *********/
function watchlayoutScssTask() {
    watch('scss/**/*.scss',
        series([layoutscssTask]));
}


exports.watchlayoutScss = watchlayoutScssTask

/******** Watch Tasks *********/
function watchStylesTask() {
  watch('scss/**/*.scss', scssTask);
}

exports.watchStyles = watchStylesTask

function watchScriptsTask() {
  watch('js/_components/*.js', jsTasks)
}
exports.watchScripts = watchScriptsTask

/******** Database Dump Task *********/
function dumpDatabaseTask() {
    return new Promise(function (resolve, reject) {
        mysqlDump({
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'craft_dev',
            },
            dumpToFile: './storage/dump.sql',
        });
        resolve();
    });
};

exports.dumpDatabase = dumpDatabaseTask

/******** Default Task *********/
exports.default = series(
  parallel(scssTask, series(jsDeps, jsBuild, jsConcat)),
  parallel(watchStylesTask, watchScriptsTask)
);
