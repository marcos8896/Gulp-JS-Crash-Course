const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Defines tasks.
  gulp.src - Points to the files to use.
  gulp.dest - Points to folder to output.
  gulp.watch - Watches files and folders for changes.
*/

// Logs Message
gulp.task('message', () => {
  return console.log("Gulp is running.");
});

//Copy All HTML files
gulp.task('copyHtml', () => {
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
});

//Optimize images
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minify JS
gulp.task('minify', () => {
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

//Compile SASS
gulp.task('sass', () => {
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

//Scripts
gulp.task('scripts', () => {
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default',
  ['message',
   'copyHtml',
   'imageMin',
   'sass',
   'scripts'
  ]
);

gulp.task('serve', () => {
  gulp.watch('src/js/*.js',       ['scripts']);
  gulp.watch('src/images/*',      ['imageMin']);
  gulp.watch('src/sass/*.scss',   ['sass']);
  gulp.watch('src/*.html',        ['copyHtml']);
});
