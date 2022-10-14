
# Asteroids

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

Ahoy! This kit is our all-new/all-old web starter kit. Use it well!

<center>
<img src="asteroids-700.png" width="350">
</center>

With the help of [Gulp](https://gulpjs.com) and [11ty](https://www.11ty.dev/), Asteroids includes SCSS processing, JS minification and [Nunjucks](https://mozilla.github.io/nunjucks/), a super cool template engine created by Mozilla.


## Quickstart

Install [Node.js](https://nodejs.org/) and [Gulp](https://gulpjs.com) to run this starter kit.

1. Download or clone the repository
2. Install the local dependencies with `$ npm i`
3. Run the kit development stuff with `$ npm start`

## Tasks

### Launch a web server for development

```shell
$ npm start
```

Launch Eleventy in serve mode and run some Gulp tasks to keep an eye on your SCSS/JS files to process and reload your project on port 8080

### Process a production-ready distribution

```shell
$ npm run build:pro
```

Delete and reprocess the dist folder with optimized versions of your HTML/CSS/JS files.

### Compress a production-ready distribution

```shell
$ gulp zipit
```

Delete and reprocess the public folder with optimized versions of your HTML/CSS/JS files and compress it in a .zip file.

The task picks the name of the project from the package.json "name" property.

It will generate an ignored `DDMMYY-hm-project-name.zip` file

## Folder structure

The **gulpfile.js** uses a configuration JSON file to set source and destination files of the project.
Check config.json out and edit what you need.

The project folder structure looks like this:

```txt
/.
├── _src/
│   ├── _data/
│   │   └── settings.js
│   ├── _templates/
│   │   └── layouts/
│   ├── assets/
│   │   ├── _domain/
│   │   ├── _icon/
│   │   ├── _scripts/
│   │   ├── _scss/
│   │   ├── css/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── js/
│   └── index.njk
└── dist/
    ├── CNAME
    ├── assets/
    │   ├── css/
    │   ├── fonts/
    │   ├── images/
    │   └── js/
    ├── favicon.ico
    ├── humans.txt
    └── index.html

```

## CSS

Asteroids do not include a CSS reset stylesheet anymore, but we have added two awesome tools:

* A **csscomb** JSON file to use with your code editor as your own risk :)
* The media query combiner tool from @hail2u [**css-mqpacker**](https://github.com/hail2u/node-css-mqpacker/pkgs/npm/css-mqpacker).

## LINTERS AND STUFF
A few linter configurations are also included in Asteroids: Eslint, Stylelint and Markdown lint. You may need certain plugins or extensions for your code editor in order to use them.

> 👉 There is no such thing as a pre commit configuration or autoformat setting, these linters are only meant to show "problems" as you edit any JS/SCSS/MD file.


## Browser Support
That's up to you :), although you can find a "browserlist" property for the autoprefixer in the package.json file.

## TODO

So, what is next?

* [X] Gulp task to generate a timestamped deploy folder
* [X] Add CSS Linters
* [X] Add JS Linters
* [X] Use EJS/Nunjucks instead of PUG
* [X] Quit using Jquery
* [X] Migrate to 11ty
* [ ] Add a GitHub Pages action
* [ ] Mobile icons + PSD source file
* ~~Update modernizr checkers~~
* ~~Fix PUG/HTML reload loop~~

## Request a feature

Do you miss anything? Feel free to [request a feature](https://github.com/spacenomads/Asteroids/issues/new?assignees=oneeyedman&labels=%F0%9F%92%A1+New%21&template=---feature-request.md&title=) or contribute to making it better ;)

