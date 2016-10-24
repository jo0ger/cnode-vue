var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    del = require('del'),
    webpack_config = require("./webpack.config.js");

gulp.task("clean-code", function(cb){
    del("./dist/**/*").then(paths => {
        console.log('删除dist目录下的文件（夹）:\n', paths.join('\n'));
        cb();
    });
});

gulp.task("webpack", ["clean-code"], function(cb){
    webpack(webpack_config, cb)
});

gulp.task("css-minify", function(){
    return gulp.src("./dist/**/*.css")
            .pipe(minifycss())
            .pipe(gulp.dest("./dist"));
});

gulp.task("js-uglify", function(){
    return gulp.src("./dist/**/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["webpack"], function(){
    gulp.start("css-minify", "js-uglify");
});
