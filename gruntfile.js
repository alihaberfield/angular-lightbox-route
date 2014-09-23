module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uncss: {
            dist: {
                files: {
                    'app/assets/lib/css/tidy.css': ['app/assets/templates/index.html','app/assets/templates/modal.html']
                }
            }
        },
        env : {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }

        },
        jshint: {
            options : {
              force: true
            },
            all: ['Gruntfile.js', 'app/assets/js/*.js'],

        },
        preprocess : {
            options: {
                context : {
                    DEBUG: true
                }
            },
            dev : {

                src : 'app/assets/templates/index.html',
                dest : 'app/dev/index.html'

            },
            prod: {
                src : 'app/assets/templates/index.html',
                dest : 'app/prod/index.html'

            }

        },
        concat: {
            modules: {
                src: ['app/assets/js/modules/*.js'],
                dest: 'app/assets/js/build/concat.js',
            },
            libs: {
                src: [
                    'app/assets/lib/js/jquery-1.8.3.min.js',
                    'app/assets/lib/js/angular.js',
                    'app/assets/lib/js/angular-route.js',
                    'app/assets/lib/js/angular.js',
                    'app/assets/lib/js/ui-bootstrap-tpls-0.7.0.js'
                ],
                dest: 'app/assets/js/prod/libs.js'
            }
        },
        removelogging: {
            dist: {
                src: "app/assets/js/build/concat.js" // Each file will be overwritten with the output!
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'app/assets/js/prod/production.min.js': ['app/assets/js/build/concat.js']
                }
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'app/assets/css/',
                    src: ['styles.css'],
                    dest: 'app/assets/css/',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            scripts: {
                files: [
                    'app/assets/js/modules/*.js',
                    'app/assets/templates/*.html',
                    'app/assets/sass/*.scss'
                ],
                tasks: ['dev'],
                options: {

                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-remove-logging");
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint', 'uncss']);
    grunt.registerTask('dev', ['jshint', 'env:dev', 'preprocess:dev']);
    grunt.registerTask('prod', ['jshint', 'concat', 'removelogging', 'uglify', 'cssmin', 'env:prod', 'preprocess:prod']);

};