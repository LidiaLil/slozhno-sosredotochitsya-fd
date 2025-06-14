const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
// const del = require('del');
const { rm } = require('fs/promises');
const browserSync = require('browser-sync').create();

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

function html() {
    return gulp.src('src/**/*.html')
          .pipe(plumber())
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  }

  function css() {
    return gulp.src('src/blocks/**/*.css')
          .pipe(plumber())
          .pipe(concat('bundle.css'))
          .pipe(gulp.dest('dist/'))
          .pipe(browserSync.reload({stream: true}));
  }

  function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

// function clean() {
//   return del('dist');
// }
async function clean() {
  await rm('dist', { recursive: true, force: true });
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

  exports.html = html;
  exports.css = css;
  exports.images = images;
  exports.clean = clean;

  exports.build = build;
  exports.watchapp = watchapp;
  exports.default = watchapp;