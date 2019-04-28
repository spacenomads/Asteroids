const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const combineMq = require('gulp-combine-mq');
const concat = require('gulp-concat');
const config = require('./config.json');
const cssminifiy = require('gulp-clean-css');
const del = require('del');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const reload = browserSync.reload;
const rename = require('gulp-rename');
const runSequence  = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');





// > Generate a cool timestamp (YYMMDD)
const getTimestamp = function() {
	const date = new Date();
	const mm = ('0'+(date.getMonth()+1)).slice(-2)
	const dd = ('0'+date.getUTCDate()).slice(-2);
	const yy = date.getUTCFullYear().toString().substr(-2);
	const timestamp = yy + mm + dd;

	return timestamp;
};





// > Get a project name argument ;)
const getProject = function(arr) {
  let projName = '-';
  arr.forEach(function(el, i) {
		if (el === '-b') {
			projName = '-' + arr[i+1] + '-';
		}
	});

	return projName;
};





// > Manage task's errors
const onError = (err) => console.log(err);





// > Force a browser page reload
const bsReload = cb => {
	browserSync.reload();
	cb();
};





// > Delete Public folder
const clean = cb => {
	del.sync(['public']);
	cb();
};





// > Copy Icons
const icons = () => {
	return src(config.icons.src)
		.pipe(dest(config.icons.dest));
};





// > Copy Images
const images = () => {
	return src(config.images.src)
		.pipe(dest(config.images.dest));
};





// > Copy Vendor JS (Jquery, Modernizr..)
const vendorJS = () => {
	return src(config.vendorJS.src)
		.pipe(dest(config.vendorJS.dest));
};





// > Copy humansTXT
const humansTXT = () => {
	return src(config.humansTXT.src)
		.pipe(dest(config.humansTXT.dest));
};





// > Process .PUG files into 'public' folder
const templates = () => {
	return src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(dest(config.templates.dest));
};





// > Process SASS/SCSS files to generate final css files in 'public' folder
const styles = () => {
	return src(config.styles.src)
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
		.pipe(dest(config.styles.dest))
		.pipe(browserSync.stream());
};





// > Process JS scripts into a single JS file inside 'assets/js' folder
const scripts= () => {
	return src(config.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat(config.scripts.destName))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(config.scripts.dest));
};





// > Process plugins into a single JS file inside 'assets/js' folder
const plugins = () => {
	return src(config.plugins.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(config.plugins.dest));
};





// > Process .PUG production ready files into 'public' folder
const templatesMin = () => {
	return src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(pug())
		.pipe(dest(config.templates.dest));
};





// > Process SASS/SCSS files to generate final css files in 'public' folder
const stylesMin = () => {
	return src(config.styles.src)
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
		.pipe(dest(config.styles.dest))
		.pipe(browserSync.stream());
};





// > Process JS scripts into a single minified JS file inside 'assets/js' folder
const scriptsMin= () => {
	return src(config.scripts.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat(config.scripts.destName))
		.pipe(uglify())
		.pipe(dest(config.scripts.dest));
};





// > Process plugins into a single JS file inside 'assets/js' folder without sourcemaps
const pluginsMin = () => {
	return src(config.plugins.src)
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(concat('plugins.js'))
		.pipe(dest(config.plugins.dest));
};





// > Generate public folder
const defaultTasks = series(clean, icons, images, humansTXT, vendorJS, templates, styles, scripts, plugins);





// > Generate public folder
const deploy = series(clean, icons, images, humansTXT, vendorJS, templatesMin, stylesMin, scriptsMin, pluginsMin);





// > Create a development server with BrowserSync
const go = series(defaultTasks, cb => {
	browserSync.init({
		server: {
			baseDir: "public"
		},
		online: false
	});
	watch(config.watch.images, series(images, bsReload));
	watch(config.watch.vendorJS, series(vendorJS, bsReload));
	watch(config.watch.humansTXT, humansTXT);
	watch(config.watch.styles, styles);
	watch(config.watch.scripts, series(plugins, scripts, bsReload));
	watch(config.watch.templates, series(templates, bsReload));
	cb();
});





// > ZIP the public folder
const zipit = series(deploy, () => {
	return src(config.zip.src)
		.pipe(zip(getTimestamp() + getProject(process.argv) + config.zip.name))
		.pipe(dest(config.zip.dest));
});





// Final tasks
module.exports = { 
	clean, 
	icons, 
	images, 
	humansTXT, 
	vendorJS, 
	templates,
	templatesMin, 
	styles,
	stylesMin,
	scripts,
	scriptsMin,
	plugins,
	pluginsMin,
	go,
	deploy,
	zipit
};
module.exports.default = defaultTasks;
