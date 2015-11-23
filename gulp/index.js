'use strict';

/*
 * Load plugins
 */

var gulp = require('gulp'),
    path = require('path');

/*
 * Document root
 */

var doc_root = path.normalize(__dirname + '/..'); // Document root

/*
 * Set global config for gulp files
 *
 * Add config in ./config, not here!
 */

var config = {

    path: {
        root: doc_root,
        gulp: doc_root + '/gulp/',
        tmp: doc_root + '/gulp/tmp/',
        tasks: doc_root + '/gulp/tasks/',
        config: doc_root + '/gulp/config/',
        source: doc_root + '/src/',
        dist: doc_root + '/dist/'
    }

};

/*
 * Extend global settings
 */

config = require(config.path.config)(config);

/*
 * Task helper function
 */

function getTask(task) {

    return require(config.path.tasks + task)(gulp, config);

}

/*
 * Stackable tasks
 *
 * Individual tasks are registered here
 */

/* Support require modules */
gulp.task('browserify', getTask('/browserify'));

/*
 * Composed tasks
 *
 * Series of stackable tasks are registered here
 */

/* Default task */
gulp.task('default', gulp.series(
    'browserify'
));
