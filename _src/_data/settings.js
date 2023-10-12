function getYear() {
	return new Date().getFullYear();
}





function getStaticsVersion() {
	const version = new Date()
		.toISOString()
		.replace(/[^A-SU-Y0-9]/g, '');
	return version;
}





module.exports = {
	lang: 'en',
	mode: process.env.MODE,
	siteName: 'Asteroids',
	version: getStaticsVersion(),
	year: getYear(),
};
