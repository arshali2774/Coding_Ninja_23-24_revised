import gulp from 'gulp';
import concat from 'gulp-concat';
// Task to concatenate files
gulp.task('concat', function () {
  return gulp
    .src('src/files/*.{js,json,css,html}')
    .pipe(concat('all.js')) // Concatenate to all.js
    .pipe(gulp.dest('dest/files')); // Output to dest/files
});

// Default task
gulp.task('default', gulp.series('concat'));
