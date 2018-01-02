# Asteroids
Ahoy! This is our all-new/all-old web starter kit. Use it well!

<img src="https://spacenomads.com/assets/img/projects/asteroids/asteroids-700.png" width="400">


Asteroids includes a SASS, jQuery and [PUG](https://github.com/pugjs/pug), a super cool template engine.

## Quickstart
Install [Node.js](https://nodejs.org/) and [Gulp](https://gulpjs.com) to run this starter kit.
1. Download or clone the repository (You can download it with Bower: `$ bower install asteroids-kit`)
2. Install the local dependencies with `$ npm install`
3. Run the kit with `$ gulp go`

## Gulp tasks
### Launch a webserver for development
```
$ gulp go
```
Launch a webserver with browserSync to work on your proyect. Several watchers will have their eyes on your PUG/SCSS/JS files to reload your connected browsers when needed.

### Process a production-ready distribution
```
$ gulp deploy
```
Delete and reprocess the public folder with optimized versions of your HTML/CSS/JS files.

### Compress a production-ready distribution
```
$ gulp zipit
```
Delete and reprocess the public folder with optimized versions of your HTML/CSS/JS files and compress it in a .zip file.

## Folder structure
Our **gulpfile.js** uses a configuraton JSON file to set source and destination files of the project.
Check config.json out and edit what you need.

The folder structure looks like:
```
/
|- _source
|   |- assets
|   |   |- icons
|   |   |- img
|   |   |   `- layout
|   |   `- js
|   |       `- vendor   
|   |- js
|   |   `- plugins
|   |- scss
|   |   |- components
|   |   |- core
|   |   |- pages
|   |   `- vendors
|   `- templates
|      |- layout
|      `- partials
`- public
   `- assets
       |- css
       |- img
       |   `- layout
       `- js
           `- vendor
```


## CSS
Asteroids does not include a CSS reset stylesheet anymore but we have included two awesome tools:
* A **csscomb** JSON file to use with your code editor as your own risk :)
* The risky [**gulp-combine-mq**](https://www.npmjs.com/package/gulp-combine-mq) package to group ans combine all your mediaqueries.

## JS
**Asteorids** uses JQuery, Modernizr and two JS files, main.js and plugins.js, located before the `</body>` tag. The custom build of Modernizr is loaded in the `<head>` section of the page.

| Item | Version | URL |
| ------ | ------- | --- |
| JQuery | v3.2.1 | https://jquery.com
| Modernizr | v3.5.0 | https://modernizr.com
| Width_snitch | v1 | https://github.com/oneeyedman/Width-Snitch/
| Breakpoints | v1.0 | https://github.com/xoxco/breakpoints
| jQuery Cookie Plugin | v1.4.0 | https://github.com/carhartl/jquery-cookie

## Browser Support
That's up to you ;)

## TODO
So, what is next?

- [ ] Mobile icons + PSD source file
- [ ] Gulp task to generate a timestamped deploy folder
- [ ] Fix PUG/HTML reload loop
- [ ] Add CSS Linters
- [ ] Add JS Linters

## Request a feature
Do you miss something? Feel free to request a feature or contribute to make it better ;)
