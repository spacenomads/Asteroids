var
	browserSync	= require('browser-sync'),
	del					= require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	concat			 = require('gulp-concat'),
	cssminifiy	 = require('gulp-clean-css'),
	gulp				 = require('gulp'),
	combineMq		 = require('gulp-combine-mq'),
	gutil				 = require('gulp-util'),
	notify			 = require('gulp-notify'),
	plumber			= require('gulp-plumber'),
	rename			 = require('gulp-rename'),
	sass				 = require('gulp-sass'),
	uglify			 = require('gulp-uglify')
	config			 = require('./config.json'),
	runSequence	= require('run-sequence'),
	sourcemaps	 = require('gulp-sourcemaps'),
	jade				 = require('gulp-jade')
	reload			 = browserSync.reload;





// > Manage task's errors
var onError = function (err) {
	gutil.beep();
	console.log(err);
};





// > Process .JADE files into 'public' folder
gulp.task( 'templates' , function(cb) {
	return gulp.src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(jade({}))
		.pipe(gulp.dest(config.templates.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'JADE OK', onLast: true}));
});





// > Process SASS/SCSS files to generate final css files in 'public' folder
gulp.task( 'styles' , function(cb) {
	return gulp.src(config.styles.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie >= 10'],
			cascade: false
		}))
		.pipe(cssminifiy())
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'CSS OK', onLast: true}));
});





// > Process plugins into a single JS file inside 'assets/js' folder
gulp.task('plugins', function(){
	return gulp.src(config.plugins.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		//.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.plugins.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'PLUGINS OK', onLast: true}));
});





// > Process JS scripts into a single JS file inside 'assets/js' folder
gulp.task('scripts', function(){
	return gulp.src(config.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'JS OK', onLast: true}));
});





// > Create a development server with BrowserSync
gulp.task('serve', ['default'], function () {
	browserSync.init({
		server : {
			baseDir: "public"
		},
		ghostMode: false,
		online: true
	});

	gulp.watch(config.watch.styles, ['styles']);
	gulp.watch(config.watch.scripts, ['scripts', 'plugins']);
	gulp.watch(config.watch.templates, ['templates']);
});





// > Force a browser page reload
gulp.task('bs-reload', function () {
	browserSync.reload();
});





// > Generate 'public' folder
gulp.task('default', function (cb) {
	runSequence('styles', ['templates','plugins', 'scripts'], cb);
});
