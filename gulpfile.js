// Include gulp.
var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var browsersync = require("browser-sync").create();
var config = require("./config.json");

// Include plugins.
var postcss = require("gulp-postcss");
var pxtorem = require("postcss-pxtorem");
var cssvariables = require("postcss-css-variables");
var autoprefixer = require("autoprefixer");
var gulpAutoprefix = require("gulp-autoprefixer");
var gulpif = require("gulp-if");
var shell = require("gulp-shell");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var banner = require("gulp-banner");
var sass = require("gulp-sass");
var glob = require("gulp-sass-glob");
var scssLint = require("gulp-scss-lint");
var sourcemaps = require("gulp-sourcemaps");
var csscomb = require("gulp-csscomb");
var rtlcss = require("gulp-rtlcss");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var pngcrush = require("imagemin-pngcrush");

var comment =
  "/*\n" +
  " * <%= pkg.name %> <%= pkg.version %>\n" +
  " * <%= pkg.description %>\n" +
  " * <%= pkg.homepage %>\n" +
  " *\n" +
  " * Copyright (c) <%= new Date().getFullYear() %>, <%= pkg.author %>\n" +
  " * Released under the <%= pkg.license %> license.\n" +
  "*/\n\n";

var plugins = [
  autoprefixer({
    overrideBrowserslist: ["last 8 versions", "> 1%", "ie 9", "ie 10"],
  }),
  pxtorem({
    rootValue: 16,
    unitPrecision: 5,
    propList: ["*", "!background*", "!letter-spacing"],
    selectorBlackList: [/^body$/, /^html$/, /^:root$/],
    replace: false,
    mediaQuery: false,
    minPixelValue: 0,
  }),
  cssvariables({
    preserve: "computed",
  }),
];
// CSS.
gulp.task("css", (done) => {
  return (
    gulp
      .src(config.css.file)
      .pipe(glob())
      .pipe(
        plumber({
          errorHandler: function (error) {
            notify.onError({
              title: "Gulp",
              subtitle: "Failure!",
              message: "Error: <%= error.message %>",
              sound: "Beep",
            })(error);
            this.emit("end");
          },
        })
      )
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: "expanded",
          errLogToConsole: true,
          includePaths: config.css.includePaths,
        })
      )
      .pipe(postcss(plugins))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest(config.css.dest))
      .pipe(gulpif("vactory-rtl.style.css", rtlcss())) // Convert to RTL.
      .pipe(gulpif('*.css', sourcemaps.write('./')))
      .pipe(gulp.dest(config.css.dest))
  );
});

gulp.task("ckeditor", (done) => {
  return gulp
    .src(config.ckeditor.file)
    .pipe(glob())
    .pipe(
      plumber({
        errorHandler: function (error) {
          notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep",
          })(error);
          this.emit("end");
        },
      })
    )
    .pipe(
      sass({
        style: "compressed",
        errLogToConsole: true,
        includePaths: config.ckeditor.includePaths,
      })
    )
    .pipe(postcss(plugins))
    .pipe(gulp.dest(config.ckeditor.dest));
});

gulp.task("csscomb", function () {
  return gulp
    .src(config.csscomb.src)
    .pipe(csscomb())
    .pipe(gulp.dest(config.csscomb.dest));
});

// JavaScript.
gulp.task("js", (done) => {
  return (
    gulp
      .src(config.js.src)
      .pipe(jshint())
      // .pipe(jshint.reporter('jshint-stylish'))
      // .pipe(sourcemaps.init())
      .pipe(
        concat(config.js.file, {
          newLine: ";",
        })
      )
      .pipe(
        banner(comment, {
          pkg: config,
        })
      )
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.js.dest))
  );
  // .pipe(browsersync.reload({stream: true}));
});

// Compress images.
gulp.task("images", (done) => {
  return gulp
    .src(config.images.src)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
        use: [pngcrush()],
      })
    )
    .pipe(gulp.dest(config.images.dest));
});

gulp.task("styleguide", (done) => {
  return gulp
    .src(config.styleguide.src)
    .pipe(
      plumber({
        errorHandler: function (error) {
          notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep",
          })(error);
          this.emit("end");
        },
      })
    )
    .pipe(twig())
    .pipe(gulp.dest(config.styleguide.dest))
    .pipe(browsersync.reload({ stream: true }));

  done();
});

gulp.task("browserSync", (done) => {
  browsersync.init({
    proxy: config.proxy,
    open: true,
    reloadOnRestart: true,
    port: 3000,
    localOnly: true,
    injectChanges: true,
    online: true,
  });
  done();
});

// BrowserSync Reload
gulp.task("browserSyncReload", (done) => {
  browsersync.reload();
  done();
});

// Watch task.
gulp.task("watchFiles", (done) => {
  gulp.watch(config.css.src, gulp.series("css", "browserSyncReload"));
  gulp.watch(config.css.custom_module, gulp.series("css", "browserSyncReload"));
  gulp.watch(config.css.vactory_module, gulp.series("css", "browserSyncReload"));
  gulp.watch(config.ckeditor.src, gulp.series("ckeditor", "browserSyncReload"));
  gulp.watch(config.js.src, gulp.series("js", "browserSyncReload"));
  gulp.watch(config.images.src, gulp.series("images", "browserSyncReload"));
  // gulp.watch(config.twig.src, gulp.series("styleguide", "browserSyncReload"));
  done();
});

gulp.task("build", gulp.series("css", "js", "images", "csscomb"));
// Run drush to clear the theme registry.
gulp.task("drush", shell.task(["drush cr"]));
// Default Task
gulp.task("default", gulp.series("browserSync", "watchFiles"));
