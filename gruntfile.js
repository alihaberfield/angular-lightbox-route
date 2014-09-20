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
            dist: {
                src: [
                    'app/assets/js/modules/*.js',
                ],
                dest: 'app/assets/js/build/concat.js',
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

    grunt.registerTask('default', ['jshint', 'uncss']);
    grunt.registerTask('dev', ['jshint', 'env:dev', 'preprocess:dev']);
    grunt.registerTask('prod', ['jshint', 'concat', 'removelogging', 'uglify', 'env:prod', 'preprocess:prod']);

};