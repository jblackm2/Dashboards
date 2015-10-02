module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        html2js: {
            dist: {
                src: ['app/*.html', 'app/errorStatus/*.html', 'app/hostStatus/*.html', 'app/serviceStatus/*.html'],
                //src: ['app/errorStatus/*.html', 'app/hostStatus/*.html', 'app/serviceStatus/*.html'],
                dest: 'dist/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'app/bower_components/angular/angular.js', 'app/*.js', 'app/hostStatus/*.js', 'app/errorStatus/*.js','app/serviceStatus/*.js','tmp/*.js', 'dist/templates.js',
                'app/bower_components/angular-route/angular-route.js', 'app/components/version/version.js', 'app/components/version/version-directive.js', 'app/components/version/interpolate-filter.js'],
                dest: 'dist/app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/app.js': [ 'dist/app.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/css.css': [ 'app/**/*.css' ]
                }
            }
        },
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './lib',
                    cleanTargetDir: true
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/resources/',
                    src: ['**/*.{png,jpg}'],
                    dest: 'dist/images/'
                }]
            }
        },
        'string-replace': {
            dist: {
                files: {
                    'dist/app.js': 'dist/app.js',
                },
                options: {
                    replacements: [
                        // place files inline example
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },
                        {
                            pattern: 'resources',
                            replacement: 'images'
                        },

]
}
}
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('default', ['bower','concat', 'uglify', 'imagemin', 'html2js', 'cssmin', 'string-replace']);

};