module.exports = function(grunt) {
	grunt.registerTask('watch', [ 'watch' ]);
	grunt.registerTask('server', [ 'connect', 'watch' ]);
	grunt.initConfig({
		less: {
			style: {
				files: {
					"app/css/styles.css": "app/less/styles.less"
				}
			}
		},
		concat: {
			dist: {
				src: ['bower_components/jquery/jquery.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'bower_components/momentjs/min/moment.min.js', 'app/js/*.js', '!app/js/main.js', '!app/js/built.min.js', 'app/js/main.js'],
				dest: 'app/js/built.min.js'
			}
		},
		uglify: {
			options: {
				mangle: true,
				compress: true
			},
			my_target: {
				files: {
					'app/js/built.min.js': ['app/js/built.min.js']
				}
			},
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'app/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'app/css/',
				ext: '.min.css'
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'app/',
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['app/html/*.html'],
				tasks: ['inject:development']
			},
			js: {
				files: ['app/js/*.js', '!app/js/built.min.js'],
				tasks: ['concat']
			},
			css: {
				files: ['app/less/*.less'],
				tasks: ['less:style', 'cssmin'],
			}
		},
		inject: {
			development: {
				scriptSrc: 'DevelopmentWorkflow.js',
				files: {
					'app/index.html': 'app/html/index.html'
				}
			},
			production: {
				scriptSrc: 'ProductionWorkflow.js',
				files: {
					'app/index.html': 'app/html/index.html'
				}
			}
		},
		copy: {
			copyHtml: {
				cwd: 'app',
				src: [ 'html/*'],
				dest: 'app',
				expand: true,
				flatten: true
			},
			cname: {
				src: 'app/CNAME',
				dest: 'build/CNAME'
			},
			buildAssets: {
				cwd: 'app',
				src: [ 'css/styles.min.css','js/built.min.js', 'img/png/**', 'img/gif/**'],
				dest: 'build',
				expand: true
			},
			copyProductionScripts: {
				cwd: 'app',
				src: [ 'js/production/**'],
				dest: 'build',
				expand: true
			},
			buildHtml: {
				cwd: 'app',
				src: [ '*.html' ],
				dest: 'build',
				expand: true,
				flatten: true
			}
		},
		clean: {
			build: {
				src: ['build/**', '!build/.git/**', '!build/.gitignore'],
				filter: 'isFile'
			}
		}
	});

	//NPM tasks
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-inject');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//Other tasks
	grunt.registerTask(
		'build',
		'Clean up and copy only necessary files into the build directory',
		[ 'inject:production', 'clean', 'copy:buildAssets', 'copy:copyProductionScripts','copy:buildHtml','copy:cname' ]
	);

};
