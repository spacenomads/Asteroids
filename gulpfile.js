var
		autoprefixer = require( 'gulp-autoprefixer' ),
		combineMq    = require( 'gulp-combine-mq' ),
		concat       = require( 'gulp-concat' ),
		cssminifiy   = require( 'gulp-minify-css' ),
		gulp         = require( 'gulp' ),
		gutil        = require( 'gulp-util' ),
		jade         = require( 'gulp-jade' ),
		livereload   = require( 'gulp-livereload' ),
		notify       = require( 'gulp-notify' ),
		plumber      = require( 'gulp-plumber' ),
		rename       = require( 'gulp-rename' ),
		replace      = require( 'gulp-replace' ),
		sass         = require( 'gulp-ruby-sass' ),
		uglify       = require( 'gulp-uglify' );

var
	src_folder = '_source',
	dist_folder = 'public',
	main_js_file = 'scripts.js';

var onError = function (err) {
	gutil.beep();
	console.log(err);
};

gulp.task( 'scss_styles' , function( cb ) {
	return sass( src_folder + '/scss' )
		.pipe( replace( /!hosita(\s{1}tupa)?/g, '!important' ) )
		.pipe( plumber({errorHandler: notify.onError( "Error: <%= error.message %>" )}) )
		.pipe( autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}) )
		.pipe( combineMq() )
		.pipe( cssminifiy() )
		.pipe( gulp.dest( dist_folder + '/assets/css' ) );
});

gulp.task( 'js_scripts', function() {
	return gulp.src( [ src_folder + '/js/plugins/*.js', src_folder + '/js/*.js'] )
		.pipe( plumber( {errorHandler: notify.onError("Error: <%= error.message %>")}) )
		.pipe( concat( main_js_file ) )
		.pipe( uglify({
			mangle: false
		}) )
		.pipe( gulp.dest( dist_folder + '/assets/js/' ) );
});

gulp.task('pages', function() {
  var YOUR_LOCALS = {};

  gulp.src( src_folder + '/jade/*.jade')
  	.pipe( plumber({errorHandler: notify.onError( "Error: <%= error.message %>" )}) )
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true,
    }))
    .pipe(gulp.dest( dist_folder + '/'))
});


gulp.task( 'watch', function() {
	livereload.listen();
	gulp.watch( src_folder + '/js/*.js', ['js_scripts'] ).on( 'change', livereload.changed );
	gulp.watch( src_folder + '/scss/*.scss', ['scss_styles'] );
	gulp.watch( dist_folder + '/assets/css/*.css' ).on( 'change', livereload.changed );
	gulp.watch( src_folder + '/jade/**/*.jade', ['pages'] );
	gulp.watch( dist_folder + '/*.html' ).on( 'change', livereload.changed );
});

gulp.task( 'default', ['watch'] );
