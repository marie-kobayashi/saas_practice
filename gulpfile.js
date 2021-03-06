var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

// pugは一旦使わない。多分テンプレート。暇だったらググってみる。
// gulp.task('html', function(){
//   return gulp.src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('build/html'))
// });

gulp.task('html', function(){
  return gulp.src('client/*.html')
    .pipe(gulp.dest('build/html'))
});


gulp.task('css', function(){
  return gulp.src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'))
});

// SassとCssの保存先を指定
gulp.task('sass', function(){
  // gulp.src('./sass/**/*.scss')
  gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function(){
  return gulp.src('client/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'))
});

//自動監視のタスクを作成(sass-watchと名付ける)
gulp.task('sass-watch', ['sass'], function(){
  var watcher = gulp.watch('./sass/**/*.scss', ['sass']);
  watcher.on('change', function(event) {
  });
});

gulp.task('default', [ 
  'html',
  'css',
  'sass',
  'js',
  // 'sass-watch',
  ]);
