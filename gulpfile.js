var gulp         = require('gulp'),
    connect      = require('gulp-connect'),
    sass         = require('gulp-sass'),
    minifycss    = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify   = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
    uglify       = require('gulp-uglify');

gulp.task('connect', function() {
  connect.server({
    root: ['demo', 'dist'],
    livereload: true
  })
});

gulp.task('css', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})

gulp.task('js', function() {
  return browserify({ entries: './src/js/main.js' })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['connect', 'watch']);