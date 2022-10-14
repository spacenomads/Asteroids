const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const config = require('./config.json');
const packageJson = require('./package.json');
const gulpif = require('gulp-if');
const isDev = process.env.MODE === config.env.dev;
const minify = require('gulp-minify');
const mqpacker = require('@hail2u/css-mqpacker');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');





// UTILS
// > Generate a cool timestamp (YYMMDD)
function getTimestamp() {
	const date = new Date();
	const mm = ('0'+(date.getMonth()+1)).slice(-2);
	const dd = ('0'+date.getUTCDate()).slice(-2);
	const yy = date.getUTCFullYear().toString().substr(-2);
	const h = date.getHours();
	const m = date.getMinutes();
	const timestamp = `${yy}${mm}${dd}-${h}${m}-`;
	return timestamp;
}





// TASKS
// > ZIP the public folder
function zipit() {
	return src(config.zip.src)
		.pipe(zip(getTimestamp() + packageJson.name + '.zip'))
		.pipe(dest(config.zip.dest));
}

function styles() {
	const plugins = [mqpacker({ sort: true })];
	return src(config.styles.src)
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(sass({
			outputStyle: isDev ? 'expanded' : 'compressed',
		}).on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulpif(isDev, sourcemaps.write('./')))
		.pipe(dest(config.styles.dest));
}

function scripts() {
	return src(config.scripts.src)
		.pipe(minify({
			noSource: true,
			ext: {
				min: '.js'
			}
		}))
		.pipe(gulpif(isDev, sourcemaps.init()))
		.pipe(gulpif(isDev, sourcemaps.write('./')))
		.pipe(dest(config.scripts.dest));
}

const build = series(styles, scripts);

const go = series(build, function (cb) {
	watch(config.watch.styles, styles);
	watch(config.watch.scripts, scripts);
	cb();
});

module.exports = {
	build,
	styles,
	go,
	zipit
};
