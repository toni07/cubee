module.exports = function (grunt) {
    grunt.initConfig({

    paths: {
            src: {
                js: 'cubee/*.js'
            },
            dest: {
                js: 'bin/cubee.js',
                jsMin: 'bin/cubee.min.js'
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.js %>'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                sourceMap: true
            },
            target: {
                src: '<%= paths.src.js %>',
                dest: '<%= paths.dest.jsMin %>'
            }
        }
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default', [ 'concat', 'uglify' ]);


};
