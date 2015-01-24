gulp-mox
========

> Gulp plugin for using [mox](https://github.com/tjchaplin/mox) ( A markdown javascript documentation generator)  

* Issues with the output should be reported on the mox [issue tracker](https://github.com/tjchaplin/mox/issues).*

[![Build Status](https://travis-ci.org/tjchaplin/gulp-mox.svg)](https://travis-ci.org/tjchaplin/gulp-mox)

## Install

```bash
$ npm install --save-dev gulp-mox
```

## Usage

```js
var gulp = require('gulp');
var mox = require('gulp-mox');

gulp.task('documentation', function () {
	return gulp.src('anySourceFile.js')
		.pipe(mox())
		.pipe(gulp.dest('documentation'));
});
```

## Example Documentation Output

See the mox [examples](https://github.com/tjchaplin/mox/tree/master/doc).

## API

### mox(options)

See the mox [options](https://github.com/tjchaplin/mox#options).

## License

[MIT](http://opensource.org/licenses/MIT) © [Tim Chaplin](https://github.com/tjchaplin)
