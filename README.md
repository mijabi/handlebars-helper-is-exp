# handlebars-helper-do-once-in-times

Extend each values of handlebars {{# is}} comparison.  

{{#is_ext a 1 b 5}} ... ((a + 1) === (b + 5))  

{{#is_ext a -1 b 0}} ... ((a - 1) === b)  

- [npmjs](https://www.npmjs.com/package/handlebars-helper-is-exp)
- [github](https://github.com/mijabi/handlebars-helper-is-exp)



## Install

```zsh
% npm install --save-dev handlebars-helper-is-exp
```




## Usage

```javascript
:Gruntfile.js

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      site: {
        options: {
          layoutdir: 'dev/assemble-layouts',
          data: ['dev/assemble-datas/**/*.{json,yml}'],
          flatten: false,
          helpers: ['handlebars-helper-is-exp']
        },
        dest: './',
        src: ['dev/*.hbs']
      }
    },

    watch: {
      assemble: {
        files: ['dev/**/*.hbs'],
        tasks: ['assemble']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-assemble');

  grunt.registerTask('default', ['assemble', 'watch']);

};
```

```json
:assemble-datas/general.json

{
  "pages": {
    "p1": {
      "page": 1,
      "url": "http://pulp.photo/",
      "title": "top page"
    },
    "p2": {
      "page": 2,
      "url": "http://pulp.photo/writings/",
      "title": "reading list"
    },
    "p3": {
      "page": 3,
      "url": "http://pulp.photo/photographs/",
      "title": "photography list"
    },
    "p4": {
      "page": 4,
      "url": "http://pulp.photo/about/",
      "title": "about site"
    }
  }
}
```

```json
:assemble-layouts/default.hbs

<!DOCTYPE html>
<html lang="ja">
  <head>
  <title>handlebars-helper-is-exp</title>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <style>
body { color: #555; }
.label { background: #ccc; color: #fff; padding: 2px 4px; font-size: 10px; display: inline-block; }
a { color: #c00; text-decoration: none; font-weight: bold; }
.current { color: #555;}
    </style>
  </head>
  <body>
    {{> body }}
  </body>
</html>
```

```html
:index.hbs

---
layout: default.hbs
currentpage: 2
---

<ul>
{{#each general.pages }}
  <li>
    <a href="{{ url }}" {{#is page ../currentpage}}class="current"{{/is}}>{{#is_exp page 0 ../currentpage 1}}<span class="label">Next &raquo;</span>&nbsp;{{/is_exp}}{{ title }}</a>
  </li>
{{/each}}
</ul>

<hr>

<ul>
{{#each general.pages }}
  <li>
    <a href="{{ url }}" {{#is page ../currentpage}}class="current"{{/is}}>{{#is_exp page 0 ../currentpage -1}}<span class="label">&laquo; Prev</span>&nbsp;{{/is_exp}}{{ title }}</a>
  </li>
{{/each}}
</ul>
```

You can get below  
[github.io](https://mijabi.github.io/handlebars-helper-is-exp/dist/)

```html
:index.html

<ul>
  <li>
    <a href="http://pulp.photo/" >top page</a>
  </li>
  <li>
    <a href="http://pulp.photo/writings/" class="current">reading list</a>
  </li>
  <li>
    <a href="http://pulp.photo/photographs/" ><span class="label">Next &raquo;</span>&nbsp;photography list</a>
  </li>
  <li>
    <a href="http://pulp.photo/about/" >about site</a>
  </li>
</ul>

<hr>

<ul>
  <li>
    <a href="http://pulp.photo/" ><span class="label">&laquo; Prev</span>&nbsp;top page</a>
  </li>
  <li>
    <a href="http://pulp.photo/writings/" class="current">reading list</a>
  </li>
  <li>
    <a href="http://pulp.photo/photographs/" >photography list</a>
  </li>
  <li>
    <a href="http://pulp.photo/about/" >about site</a>
  </li>
</ul>
```
