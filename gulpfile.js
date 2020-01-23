var gulp = require('gulp');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var del = require('del');

function styles() {
    return gulp
        .src('./style/style.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./style/'));
}

function clean(){
    return del(['./style/dist', './scripts/dist', './dist'], {force:true});
};

exports.default = function () {
    // You can use a single task
    gulp.watch('./style/*.less', styles);
    gulp.watch('./style/*.css', clean);

};