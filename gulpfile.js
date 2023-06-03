import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import {deleteAsync} from 'del';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin( { collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}


// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}


// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.otf',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
    done();
}


// Clean

const clean = () => {
  return deleteAsync('build');
}


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}


// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles, reload));
  gulp.watch('source/js/*.js', gulp.series(scripts, reload))
  gulp.watch('source/*.html', gulp.series(html, reload));
}


// Build

export const build = gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
    createStack
  )
)


export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html,
    scripts,
    createStack
  ),
  gulp.series(
    server,
    watcher
  )
);
