module.exports = function(grunt) {
	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			scripts: {
				files: ['libs/js-src/*.js'],
				tasks: ['concat','uglify'],
				options: {
					spawn: false,
				}
			},
			sass: {
				files: ['libs/sass/**/*.{scss,sass}','libs/sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			livereload: {
				files: ['public/*.html', 'public/*.php', 'public/js/**/*.{js,json}', 'public/css/*.css','public/bilder/**/*.{png,jpg,gif,svg}'],
				options: {
					livereload: true
				}
			}
		},

		concat: {
			dist: {
				src: 'libs/js-src/*.js',
				dest: 'public/js/scripts.js'
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'bilder-origs/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'public/bilder/'
				}]
			}
		},

		svgmin: {
			options: {
				plugins: [{
					removeViewBox: false ,
					removeUselessStrokeAndFill: false
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'bilder-origs/',
					src: '*.svg',
					dest: 'public/bilder/',
					ext: '.min.svg',
				}]
			}
		},

		sass: {
			options: {
				//sourceMap: true,
				outputStyle: 'expanded' //'compressed'
			},
			dist: {
				files: {
					'public/css/styles.css': 'libs/sass/styles.scss'
				}
			}
		}

	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat','uglify','imagemin','svgmin','sass:dist','watch']);

};