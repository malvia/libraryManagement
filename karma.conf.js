

module.exports = function(config) {
config.set({
    frameworks: ['jasmine'],
    files: [
        'assets/js/angular/angular.min.js',
        'assets/js/angular/angular-mocks.js',
        'assets/js/pouchdb/pouchdb.min.js',
        'assets/js/angular-pouchdb/angular-pouchdb.min.js',
        'app/app.js',
        'test/*.js'
    ],
    browsers: [
        'Chrome',
    ],
    autoWatch: false,
    singleRun: true,
    reporters: [
        'progress',
        'coverage'
    ],
    preprocessors: {
        'angular-pouchdb.js': ['coverage']
    },
        coverageReporter: {
        dir: 'test/coverage',
        reporters: [{
                type: 'lcov',
                subdir: 'lcov'
            }]
        }
    });
};
