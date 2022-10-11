const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const config = require('./config.json');
const gulpif = require('gulp-if');
const isDev = process.env.MODE === config.env.dev;
const mqpacker = require('@hail2u/css-mqpacker');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');




// TASKS
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

const build = series(styles);

const go = series(build, function (cb) {
	watch(config.watch.styles, styles);
	cb();
});

module.exports = {
	build,
	styles,
	go
};
