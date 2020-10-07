const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const combineMq = require('gulp-combine-mq');
const config = require('./config.json');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const htmltidy = require('gulp-htmltidy');
const notify = require('gulp-notify');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
//const uglify = require('gulp-uglify');
const zip = require('gulp-zip');





// > Generate a cool timestamp (YYMMDD)
function getTimestamp() {
	const date = new Date();
	const mm = ('0'+(date.getMonth()+1)).slice(-2);
	const dd = ('0'+date.getUTCDate()).slice(-2);
	const yy = date.getUTCFullYear().toString().substr(-2);
	const timestamp = yy + mm + dd;
	return timestamp;
}





// > Get a project name argument ;)
function getProject(arr) {
	let projName = '-';
	arr.forEach(function(el, i) {
		if (el === '-b') {
			projName = '-' + arr[i+1] + '-';
		}
	});

	return projName;
}





// > Force a browser page reload
function bsReload(cb) {
	browserSync.reload();
	cb();
}





// > Delete Public folder
function clean(cb) {
	del.sync(['public']);
	cb();
}





// > Copy Icons
function icons()  {
	return src(config.icons.src)
		.pipe(dest(config.icons.dest));
}





// > Copy Images
function images() {
	return src(config.images.src)
		.pipe(dest(config.images.dest));
}





// > Copy Vendor JS (Jquery, Modernizr..)
function vendorJS() {
	return src(config.vendorJS.src)
		.pipe(dest(config.vendorJS.dest));
}





// > Copy humansTXT
function humansTXT() {
	return src(config.humansTXT.src)
		.pipe(dest(config.humansTXT.dest));
}





// > Process Nunjucks files into 'public' folder
function templates() {
	return src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(nunjucksRender({
			path: [config.templates.path]
		}))
		.pipe(htmltidy({
			doctype: 'html5',
			hideComments: true,
			indent: true
		}))
		.pipe(dest(config.templates.dest));
}





// > Process SASS/SCSS files to generate final css files in 'public' folder
function styles() {
	return src(config.styles.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass({
			outputStyle: 'extended',
		}))
		.pipe(combineMq({
			beautify: true
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(config.styles.dest))
		.pipe(browserSync.stream());
}





// > Process JS scripts into a single JS file inside 'assets/js' folder
function scripts() {
	return src(config.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(config.scripts.dest));
}





// > Process production-ready Nunjucks files into 'public' folder
function templatesMin() {
	return src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(nunjucksRender({
			path: [config.templates.path]
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest(config.templates.dest));
}





// > Process SASS/SCSS files to generate final css files into 'public' folder
function stylesMin() {
	return src(config.styles.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest(config.styles.dest))
		.pipe(browserSync.stream());
}





// > Process JS scripts into a single minified JS file inside 'assets/js' folder
function scriptsMin() {
	return src(config.scripts.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		//.pipe(uglify())
		.pipe(dest(config.scripts.dest));
}





// GITHUB PAGES
// > Create CNAME file into production folder
function cname() {
	return src(config.cname.src)
		.pipe(rename(path => {
			path.basename = config.cname.name;
			path.extname = '';
		}))
		.pipe(dest(config.cname.docs));
}





// > Delete production folder
function cleanPro(cb) {
	del.sync(['docs']);
	cb();
}





// > Copy Icons into production folder
function iconsPro()  {
	return src(config.icons.src)
		.pipe(dest(config.icons.pro));
}





// > Copy Images into production folder
function imagesPro() {
	return src(config.images.src)
		.pipe(dest(config.images.pro));
}





// > Copy Vendor JS (Modernizr..) into production folder
function vendorJSPro() {
	return src(config.vendorJS.src)
		.pipe(dest(config.vendorJS.pro));
}





// > Copy humansTXT into production folder
function humansTXTPro() {
	return src(config.humansTXT.src)
		.pipe(dest(config.humansTXT.pro));
}





// > Process production-ready Nunjucks files into production folder
function templatesMinPro() {
	return src(config.templates.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(nunjucksRender({
			path: [config.templates.path]
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest(config.templates.pro));
}





// > Process SASS/SCSS files to generate final css files into production folder
function stylesMinPro() {
	return src(config.styles.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest(config.styles.pro));
}





// > Process JS scripts into production folder
function scriptsMinPro() {
	return src(config.scripts.src)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		//.pipe(uglify())
		.pipe(dest(config.scripts.pro));
}





// > Generate public folder
const defaultTasks = series(clean, icons, images, humansTXT, vendorJS, templates, styles, scripts);





// > Generate public folder
const deploy = series(clean, icons, images, humansTXT, vendorJS, templatesMin, stylesMin, scriptsMin);





// > Generate public folder
const production = series(cleanPro, iconsPro, imagesPro, humansTXTPro, vendorJSPro, templatesMinPro, stylesMinPro, scriptsMinPro, cname);





// > Create a development server with BrowserSync
const go = series(defaultTasks, cb => {
	browserSync.init({
		server: {
			baseDir: 'public'
		},
		online: false
	});
	watch(config.watch.images, series(images, bsReload));
	watch(config.watch.vendorJS, series(vendorJS, bsReload));
	watch(config.watch.humansTXT, humansTXT);
	watch(config.watch.styles, styles);
	watch(config.watch.scripts, series(scripts, bsReload));
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
	cleanPro,
	cname,
	icons,
	iconsPro,
	images,
	imagesPro,
	humansTXT,
	humansTXTPro,
	vendorJS,
	vendorJSPro,
	templates,
	templatesMin,
	templatesMinPro,
	styles,
	stylesMin,
	stylesMinPro,
	scripts,
	scriptsMin,
	scriptsMinPro,
	go,
	deploy,
	production,
	zipit
};
module.exports.default = defaultTasks;
