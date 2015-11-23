'use strict';

/*
 * Load dependencies
 */

var browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    derequire = require('gulp-derequire'),
    strip = require('gulp-strip-comments'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    gutil = require('gulp-util');

/*
 * @param gulp {Function}
 * @param config {Object}
 * @returns {Function}
 */

module.exports = function (gulp, config) {

    return function () {

        /**
         * Create and save the bundle
         */
        function buildBundle(b) {
            return b.bundle()
                .on('error', function (err) {
                    console.error(err);
                    this.emit('end');
                })
                .pipe(source(config.browserify.bundle))
                .pipe(derequire())
                .pipe(config.flags.uglify ? streamify(uglify()) : gutil.noop())
                .pipe(config.flags.stripcomments ? streamify(strip({safe: false})) : gutil.noop())
                .pipe(gulp.dest(config.browserify.dest));
        }

        var b = browserify(config.browserify.entries, config.browserify.opts);
        return buildBundle(b);
    }

};