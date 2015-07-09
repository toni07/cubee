module.exports = function (grunt) {
    grunt.initConfig({

    paths: {
		src: {
			js: 'cubee/*.js',
			concatjs: 'bin/modules/*.js'
		},
		dest: {
			js: 'bin/cubee.table.js',
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
			src: '<%= paths.src.concatjs %>',
			dest: '<%= paths.dest.jsMin %>'
		}
	}
});

grunt.registerTask("prepareModules", "Finds and prepares modules for concatenation.", function() {

    // get all module directories
    grunt.file.expand("cubee/*").forEach(function (dir) {

        // get the module name from the directory name
        var dirName = dir.substr(dir.lastIndexOf('/')+1);

        // get the current concat object from initConfig
        var concat = grunt.config.get('concat') || {};

        // create a subtask for each module, find all src files
        // and combine into a single js file per module
        concat[dirName] = {
            src: [dir + '/**/*.js'],
            dest: 'bin/modules/' + dirName + '.min.js'
        };

        // add module subtasks to the concat task in initConfig
        grunt.config.set('concat', concat);
    });
});

// load plugins
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

// register at least this one task
grunt.registerTask('default', [ 'prepareModules', 'concat', 'uglify' ]);


};
