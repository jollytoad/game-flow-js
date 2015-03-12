module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.loadNpmTasks('grunt-babel');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './'
                }
            }
        },
        typescript: {
            loflux: {
                src: 'loflux/src/*.ts',
                dest: 'loflux/dist/loflux.js',
                options: {
                    target: 'es5'
                }
            },
            example: {
                src: 'examples/react/src/*.ts',
                dest: 'examples/react/dist/all.js',
                options: {
                    target: 'es5'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: 'examples/react/src/',      // Src matches are relative to this path.
                        src: ['*.jsx'], // Actual pattern(s) to match.
                        dest: 'examples/react/dist/',   // Destination path prefix.
                        ext: '.js',   // Dest filepaths will have this extension.
                        extDot: 'first'   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        watch: {
            files: '**/*.ts',
            tasks: ['typescript']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/examples/react'
            }
        }
    });

    grunt.registerTask('build', ['typescript','babel']);
    grunt.registerTask('examples', ['connect', 'open', 'watch']);

};
