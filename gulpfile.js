var browserSync  = require('browser-sync');
var config       = require('./config.json');
var gulp         = require('gulp');
var reload       = browserSync.reload;
var zip          = require('gulp-zip');






// > Create a development server with BrowserSync
gulp.task('default', function () {
	browserSync.init({
		server : {
			baseDir: "./"
		},
		ghostMode: false,
		online: true
	});
	
	gulp.watch(config.watch.scripts, ['bs-reload']);
	gulp.watch(config.watch.html, ['bs-reload']);
});





// > Force a browser page reload
gulp.task('bs-reload', function () {
	browserSync.reload();
});





// > ZIP the public folder
gulp.task('zipit', function() {
	return gulp.src(config.zip.src)
		.pipe(zip(config.zip.name))
		.pipe(gulp.dest(config.zip.dest));
});