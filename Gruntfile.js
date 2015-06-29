module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            dist: ['dist/**/*'],
            temp: ['dist/temp']
        },

        copy: {
            rsc: {
                expand: true, 
                cwd: 'src/',
                src: ['rsc/**/*'], 
                dest: 'dist/'
            },
            babe: {
                expand: true,
                cwd: 'dist/temp/',
                src: 'babe.js',
                dest: 'dist/'
            }
        },

        combine: {
            index: {
                input: 'src/index.html',
                output: 'dist/index.html',
                tokens: [
                    {
                        token: '</stylesheets/>',
                        string: '<link rel="stylesheet" type="text/css" href="combined.css" />'
                    },
                    {
                        token: '</scripts/>',
                        string: '<script type="text/javascript" src="lib.js"></script> \n' +
                                '<script type="text/javascript" src="babe.js"></script> \n' +
                                '<script type="text/javascript" src="templates.js"></script> \n'                           
                    }
                ]
            }
        },
        
        concat: {
            css: {
                options: {
                    separator: '\n\n'
                },
                src: ['src/**/*.css'],
                dest: 'dist/combined.css'
            },
            lib: {
                options: {
                    separator: ';\n\n'
                },
                src: ['src/lib/jquery.min.js', 'src/lib/angular.min.js', 'src/lib/**/*.js'],
                dest: 'dist/lib.js'
            },
            js: {
                options: {
                    separator: ';\n\n'
                },
                src: ['src/js/**/*.js'],
                dest: 'dist/temp/app.js'
            },
        },


        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/temp/babelout.js': 'dist/temp/app.js'
                }
            }
        },


        ngtemplates: {
            app: {
                options: {
                    module: 'sampleApp',
                    standalone: false
                },
                cwd: 'src/js/',
                src: ['**/*.html'],
                dest: 'dist/templates.js'
            }
        },

        browserifying: {
            standard: {
                options: {
                    watch: false,
                    sourceMaps: true,
                },
                files: {
                    'dist/temp/babe.js': './dist/temp/babelout.js'
                }
            },
        },

        'watch': {
            index: {
                files: ['src/index.html'],
                tasks: 'prepareIndex'
            },
            rsc: {
                files: ['src/rsc/**/*'],
                tasks: 'prepareRsc'
            },
            css: {
                files: ['src/**/*.css'],
                tasks: 'prepareCss'
            },
            lib: {
                files: ['src/lib/**/*'],
                tasks: 'prepareLib'
            },
            html: {
                files: ['src/js/**/*.html'],
                tasks: 'prepareHtml'
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['prepareJS', 'cleanup']
            },
        }
    });

    grunt.registerTask('prepareIndex', ['combine:index']);
    grunt.registerTask('prepareCss', ['concat:css']);
    grunt.registerTask('prepareRsc', ['copy:rsc']);
    grunt.registerTask('prepareLib', ['concat:lib']);
    grunt.registerTask('prepareHtml', ['ngtemplates:app']);
    grunt.registerTask('prepareSources', ['prepareIndex', 'prepareCss', 'prepareRsc', 'prepareLib', 'prepareHtml']);

    grunt.registerTask('prepareJS', ['concat:js', 'babel:dist', 'browserifying:standard', 'copy:babe']);
    grunt.registerTask('cleanup', ['clean:temp']);

    grunt.registerTask('build-noclean', ['clean:dist', 'prepareSources', 'prepareJS']);
    grunt.registerTask('build', ['build-noclean', 'cleanup']);

    grunt.registerTask('default', ['build', 'watch']);
};