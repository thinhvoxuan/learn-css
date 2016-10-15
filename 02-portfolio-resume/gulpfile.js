var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './app/static/sass',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
     return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./app/static/fonts'));
});

gulp.task('css', function() {
    return sass('./app/static/scss/**/*.scss', { 
            style: 'compressed',
            loadPath: [
                './app/static/scss',
                config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                config.bowerDir + '/font-awesome/scss',
            ]
        }).on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(gulp.dest('./app/static/css'));
});

gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('default', ['bower', 'icons', 'css', 'watch']);
