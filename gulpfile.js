// Include gulp.
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./config.json');

// Include plugins.
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var scssLint = require('gulp-scss-lint');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var banner = require('gulp-banner');
var csscomb = require('gulp-csscomb');

var comment = '/*\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright (c) <%= new Date().getFullYear() %>, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';

// CSS.
gulp.task('css', function () {
    return gulp.src(config.css.src)
        .pipe(glob())
        .pipe(plumber({
            errorHandler: function (error) {
                notify.onError({
                    title: "Gulp",
                    subtitle: "Failure!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })(error);
                this.emit('end');
            }
        }))
         //.pipe(scssLint({
         //    'config': '.sass-lint.yml'
         //}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded',
            errLogToConsole: true,
            includePaths: config.css.includePaths
        }))
        .pipe(autoprefix('last 5 versions', '> 1%', 'ie 9', 'ie 10'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.css.dest))
        .pipe(browserSync.reload({stream: true, match: '**/*.css'}));
});

// CKEDITOR.
gulp.task('ckeditor', function () {
    // @todo: refactor.
    return gulp.src(config.ckeditor.src)
        .pipe(glob())
        .pipe(plumber({
            errorHandler: function (error) {
                notify.onError({
                    title: "Gulp",
                    subtitle: "Failure!",
                    message: "Error: <%= error.message %>",
                    sound: "Beep"
                })(error);
                this.emit('end');
            }
        }))
         //.pipe(scssLint({
         //  'config': '.sass-lint.yml'
         //}))
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded',
            errLogToConsole: true,
            includePaths: config.ckeditor.includePaths
        }))
        .pipe(autoprefix('last 5 versions', '> 1%', 'ie 9', 'ie 10'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.ckeditor.dest));
    //.pipe(browserSync.reload({stream: true, match: '**/*.css'}));
});

// JavaScript.
gulp.task('js', function () {
    return gulp.src(config.js.src)
        .pipe(jshint())
        // .pipe(jshint.reporter('jshint-stylish'))
        .pipe(sourcemaps.init())
        .pipe(concat(config.js.file, {newLine: ';'}))
        .pipe(banner(comment, {
            pkg: config
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.js.dest));
});

// Compress images.
gulp.task('images', function () {
    return gulp.src(config.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(config.images.dest));
});

// Watch task.
gulp.task('watch', function () {
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.css.custom_module, ['css']);
    gulp.watch(config.css.vactory_module, ['css']);
    gulp.watch(config.images.src, ['images']);
});

// Static Server + Watch
gulp.task('serve', ['css', 'watch'], function () {
    browserSync.init({
        proxy: config.proxy
    });
});
// // Fonts.
// gulp.task('fonts', function () {
//     return gulp.src(config.fonts.src)
//         .pipe(gulp.dest(config.fonts.dest));
// });

gulp.task('csscomb', function() {
    return gulp.src(config.ckeditor.dest)
        .pipe(csscomb())
        .pipe(gulp.dest(config.ckeditor.dest));
});

// Run drush to clear the theme registry.
gulp.task('drush', shell.task([
    'drush cache-clear theme-registry'
]));

// Default Task
gulp.task('default', ['serve']);
