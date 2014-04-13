var mox = require('mox');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function gulpMox(options) {
	'use strict';
	
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-mox', 'Streaming not supported'));
			return cb();
		}

		mox.run(file.path, options, function (err,data) {
			if (err) {
				this.emit('error', new gutil.PluginError('gulp-mox', err));
			}
			else {
				file.contents = new Buffer(data);
				file.path = gutil.replaceExtension(file.path, '.md');
			}

			this.push(file);
			cb();
		}.bind(this));
	});
};