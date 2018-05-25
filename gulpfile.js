/// <binding />
var gulp = require('gulp');
var uglify = require("gulp-uglify");

var cssmin = require('gulp-cssmin');
var cleanCSS = require('gulp-clean-css');

var imageOptimize = require('gulp-image-optimization');
var ngAnnotate = require('gulp-ng-annotate');
//var imageMin = require('gulp-imagemin');

var htmlMin = require('gulp-htmlmin');
var concatCSS = require('gulp-concat');

gulp.task('minify', function () {
    return gulp.src("wwwroot/js/*.js")
                .pipe(ngAnnotate())
               .pipe(uglify())
               .pipe(gulp.dest("wwwroot/lib/_minJS"));
});
gulp.task('minifyCSS', function () {
    return gulp.src('wwwroot/css/*.css')
		.pipe(cssmin())
        .pipe(cleanCSS({ debug: true }, function (details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
		.pipe(gulp.dest("wwwroot/lib/_minCSS"));
});
gulp.task('optimizeImageJPG', function () {
    return gulp.src('wwwroot/images/*.jpg')
		.pipe(imageOptimize())
		.pipe(gulp.dest("wwwroot/images"));
});
gulp.task('optimizeImagePNG', function () {
    return gulp.src('wwwroot/images/*.png')
		.pipe(imageOptimize())
		.pipe(gulp.dest("wwwroot/images"));
});
gulp.task('optimizeImageIcons', function () {
    return gulp.src('wwwroot/icons/images/*')
		.pipe(imageOptimize())
		.pipe(gulp.dest("wwwroot/icons/"));
});
//gulp.task('imageMinimize', function () {
//    return gulp.src('wwwroot/images/*')
//		.pipe(imageMin())
//		.pipe(gulp.dest("wwwroot/images/_optimizeImages"));
//});
gulp.task('htmlMinimize', function () {
    return gulp.src('Views/Shared/*')
		.pipe(htmlMin())
		.pipe(gulp.dest("Views/Shared"));
});
gulp.task('cssConcate', function () {
    return gulp.src('wwwroot/lib/_minCSS/*.css')
      .pipe(concatCSS('all.css'))
      .pipe(gulp.dest('wwwroot/lib/_minCSS'));
});