const gulp = require('gulp'),
  inlineNg2Template = require('gulp-inline-ng2-template'),
  sass = require('node-sass'),
  file = require('gulp-file');


const styleProcessor = (stylePath, ext, styleFile, callback) => {
  if (ext[0] === '.scss') {
    let sassObj = sass.renderSync({ file: stylePath, includePaths: ['src/css/', 'node_modules']});
    if (sassObj && sassObj['css']){
      styleFile = sassObj.css.toString('utf8');
    }
  }
  return callback(null, styleFile);
};


gulp.task('inline-airship', function () {
  gulp.src('./src/airship/**/*.ts')
    .pipe(inlineNg2Template({ useRelativePaths: true, styleProcessor: styleProcessor }))
    .pipe(gulp.dest('./inline-airship'));
});


gulp.task('process-style', function () {
  styleProcessor('./src/css/styles.scss', ['.scss'], null, function(e, styleFile) {
    file('style.css', styleFile, { src: true })
    .pipe(gulp.dest('./airship'));
  });
});
