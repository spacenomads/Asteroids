var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var cache        = require('gulp-cached');
var combineMq    = require('gulp-combine-mq');
var concat       = require('gulp-concat');
var config       = require('./config.json');
var cssminifiy   = require('gulp-clean-css');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var pug          = require('gulp-pug');
var reload       = browserSync.reload;
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var zip          = require('gulp-zip');





// > Manage task's errors
var onError = function (err) {
	gutil.beep();
	console.log(err);
};





// > Copy Icons
gulp.task('icons', function () {
	return gulp.src(config.icons.src)
		.pipe(gulp.dest(config.icons.dest))
		.pipe(notify({message: '> Icons OK', onLast: true}));
});





// > Copy Images
gulp.task('images', function () {
	return gulp.src(config.images.src)
		.pipe(gulp.dest(config.images.dest))
		.pipe(notify({message: '> Images OK', onLast: true}));
});





// > Copy Vendor JS (Jquery, Modernizr..)
gulp.task('vendor-js', function () {
	return gulp.src(config.vendorJS.src)
		.pipe(gulp.dest(config.vendorJS.dest))
		.pipe(notify({message: '> Vendor JS OK', onLast: true}));
});





// > Copy humansTXT
gulp.task('humansTXT', function () {
	return gulp.src(config.humansTXT.src)
		.pipe(gulp.dest(config.humansTXT.dest))
		.pipe(notify({message: '> HumansTXT OK', onLast: true}));
});





// > Process .PUG files into 'public' folder
gulp.task( 'templates' , function(cb) {
	return gulp.src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(cache('templatesCache'))
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(config.templates.dest))
		.pipe(notify({message: '> Templates OK', onLast: true}));
});





// > Process partials .Pug files into 'public' folder
gulp.task( 'templatePartials' , function(cb) {
	return gulp.src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(config.templates.dest))
		.pipe(notify({message: '> Complete templates OK', onLast: true}));
});





// > Process SASS/SCSS files to generate final css files in 'public' folder
gulp.task( 'styles' , function(cb) {
	return gulp.src(config.styles.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'extended',
		}))
		.pipe(combineMq({
			beautify: true
		}))
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 10'
			],
			cascade: false
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: '> CSS OK', onLast: true}));
});





// > Process SASS/SCSS files to generate final css files in 'public' folder
gulp.task( 'styles-min' , function(cb) {
	return gulp.src(config.styles.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'ie >= 10'
			],
			cascade: false
		}))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(notify({message: '> CSS MIN OK', onLast: true}));
});





// > Process plugins into a single JS file inside 'assets/js' folder
gulp.task('plugins', function(){
	return gulp.src(config.plugins.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.plugins.dest))
		.pipe(browserSync.reload({ stream:true }))
		.pipe(notify({message: 'PLUGINS OK', onLast: true}));
});





// > Process plugins into a single JS file inside 'assets/js' folder without sourcemaps
gulp.task('plugins-clean', function(){
	return gulp.src(config.plugins.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest(config.plugins.dest))
		.pipe(notify({message: 'PLUGINS CLEAN OK', onLast: true}));
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





// > Process JS scripts into a single minified JS file inside 'assets/js' folder
gulp.task('scripts-min', function(){
	return gulp.src(config.scripts.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.dest))
		.pipe(notify({message: 'JS MIN OK', onLast: true}));
});





// > Create a development server with BrowserSync
gulp.task('go', ['default'], function () {
	browserSync.init({
		server : {
			baseDir: "public"
		},
		ghostMode: false,
		online: true
	});
	gulp.watch(config.watch.images, ['bs-reload', ['images']]);
	gulp.watch(config.watch.vendorJS, ['bs-reload', ['vendor-js']]);
	gulp.watch(config.watch.humansTXT, ['humansTXT']);
	gulp.watch(config.watch.styles, ['styles']);
	gulp.watch(config.watch.scripts, ['scripts', 'plugins']);
	gulp.watch(config.watch.templates, ['bs-reload', ['templates']]);
	gulp.watch(config.watch.templatePartials, ['bs-reload', ['templatePartials']]);
});





// > Force a browser page reload
gulp.task('bs-reload', function () {
	browserSync.reload();
});





// > ZIP the public folder
gulp.task('zipit', ['deploy'], function() {
	return gulp.src(config.zip.src)
		.pipe(zip(config.zip.name))
		.pipe(gulp.dest(config.zip.dest));
});





// > Generate 'public' folder
gulp.task('default', ['clean'], function (cb) {
	runSequence('styles', ['icons', 'images', 'vendor-js', 'humansTXT', 'templates', 'templatePartials', 'plugins', 'scripts'], cb);
});





// > Generate production-ready 'public' folder
gulp.task('deploy', ['clean'], function (cb) {
	runSequence('styles-min', ['icons', 'images', 'vendor-js', 'humansTXT', 'templates', 'templatePartials', 'plugins-clean', 'scripts-min'], cb);
});




// > Delete Public folder
gulp.task('clean', del.bind(null, ['public']));
