var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

module.exports = {
    progress: function() {
        return browserify('./demos/progress/app.js')
            .transform('babelify', { presets: ['es2015', 'react'] })
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./demos/progress'));
    }
};
