'use strict';

/*
 * Load dependencies
 */

var util = require('gulp-util'); // Included in node core

module.exports = function (config) {

    /*
     * Extend gulp config
     */

    // Flags for streaming, these are set by passing one of these values as an argument
    // eg: gulp --debug (gives debug output in console)
    config.flags = {
        minify: true,
        sourcemap: true,
        uglify: true,
        stripcomments: true,
        debug: false,
        build: true
    };

    // Browserify settings
    config.browserify = {
        entries: [
            config.path.source + 'auto-render.js'
        ],
        bundle: 'auto-render.min.js',
        dest: config.path.dist,
        opts: {
            standalone: 'katex_auto_render',
            debug: config.flags.debug,
            transform: ['require-globify'],
            ignoreMissing: true
        }
    };

    return config;

};