var gulp = require('gulp'); 
var pug = require('gulp-pug');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-server-livereload');
 var plumberNotifier = require('gulp-plumber-notifier');
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: false,
      port: 8080
    }));
});
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(plumberNotifier())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 20 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('views', function buildHTML() {
  return gulp.src('./src/*.pug')
  .pipe(plumberNotifier())
  .pipe(pug({
    // Your options in here.
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
});
gulp.task('watch', function(){
  gulp.watch('./src/*.pug', ['views'])
  gulp.watch('./src/sass/*.scss', ['sass'])
})
gulp.task('default', ['views','watch','webserver','sass'])