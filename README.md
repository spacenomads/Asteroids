
# Asteroids

Ahoy! This kit is our all-new/all-old web starter kit. Use it well!

<center>
<img src="asteroids-700.png" width="350">
</center>

Asteroids include SASS, jQuery and [PUG](https://github.com/pugjs/pug), a super cool template engine.

## Quickstart

Install [Node.js](https://nodejs.org/) and [Gulp4](https://gulpjs.com) to run this starter kit.

1. Download or clone the repository
2. Install the local dependencies with `$ npm i`
3. Run the kit with `$ npm start`

## Tasks

### Launch a web server for development

```shell
$ npm start
```

Launch a web server with browserSync to work on your project. Several watchers will have their eyes on your PUG/SCSS/JS files to reload your connected browsers when needed.

### Process a production-ready distribution

```shell
$ gulp deploy
```

Delete and reprocess the public folder with optimized versions of your HTML/CSS/JS files.

### Compress a production-ready distribution

```shell
$ gulp zipit
```
Delete and reprocess the public folder with optimized versions of your HTML/CSS/JS files and compress it in a .zip file.

You can customize the name of the ZIP document editing the config.json file ;)

Optionally you can add a keyword to this ZIP file:

```shell
$ gulp zipit -b keyword
```
It will generate an ignored `DDMMYY-keyword-project-name.zip` file



## Folder structure

Our **gulpfile.js** uses a configuration JSON file to set source and destination files of the project.
Check config.json out and edit what you need.

The project folder structure looks like this:

```txt
/
|- _source
|   |- assets
|   |   |- icons
|   |   |- img
|   |   `- js
|   |       `- vendor
|   |- js
|   |   |- components
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
       `- js
```

## CSS

Asteroids do not include a CSS reset stylesheet anymore, but we have added two awesome tools:

* A **csscomb** JSON file to use with your code editor as your own risk :)
* The risky [**gulp-combine-mq**](https://www.npmjs.com/package/gulp-combine-mq) package to group and combine all your media queries.

## JS

**Asteroids** use JQuery, Modernizr and two JS files, main.js, and plugins.js, located before the `</body>` tag. You can find the custom build of Modernizr in the `<head>` section of the page.

| Item | Version | URL |
| ------ | ------- | --- |
| JQuery | v3.2.1 | [https://jquery.com](https://jquery.com)
| Modernizr | v3.5.0 | [https://modernizr.com](https://modernizr.com)
| Width_snitch | v1 | [https://github.com/oneeyedman/Width-Snitch/](https://github.com/oneeyedman/Width-Snitch/)
| Breakpoints | v1.0 | [https://github.com/xoxco/breakpoints](https://github.com/xoxco/breakpoints)
| jQuery Cookie Plugin | v1.4.0 | [https://github.com/carhartl/jquery-cookie](https://github.com/carhartl/jquery-cookie)

## Browser Support

That's up to you ;)

## TODO

So, what is next?

* [X] Gulp task to generate a timestamped deploy folder
* [X] Add CSS Linters
* [X] Add JS Linters
* [ ] Use EJS/Nunjucks instead of PUG
* [ ] Mobile icons + PSD source file
* [ ] ~~Fix PUG/HTML reload loop~~

## Request a feature

Do you miss anything? Feel free to request a feature or contribute to making it better ;)
