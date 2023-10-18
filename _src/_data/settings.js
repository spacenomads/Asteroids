var pjson = require('../../package.json');

function getYear() {
	return new Date().getFullYear();
}





function getStaticsVersioning() {
	const version = new Date()
		.toISOString()
		.replace(/[^A-SU-Y0-9]/g, '');
	return version;
}





module.exports = {
	lang: 'en',
	mode: process.env.MODE,
	siteName: 'Asteroids',
	version: getStaticsVersioning(),
	year: getYear(),
	projectVersion: pjson.version,
};
