"use strict";
var fs = require('fs');
var File = require('vinyl');
var assert = require('assert');
var gutil = require('gulp-util');
var gulpMox = require('../../index');

module.exports = function(){
	describe("Given we are using gulp-mox",function(){
		describe("Given we are generting mox documentation",function(){

			var fileData = fs.readFileSync(__dirname+'/fixtures/functionSomeClass.js','utf8').replace(/\r\n/g,'\n').replace(/\r/g,'');
			var file = null;
			beforeEach(function(){
				file = new File({
					cwd: __dirname,
					base: __dirname+'/fixtures/',
					path: __dirname+'/fixtures/functionSomeClass.js',
					contents: new Buffer(fileData)
			    });
			});
			describe("Given we are using default options",function(){
				var expectedData = fs.readFileSync(__dirname+'/expected/default.md','utf8').replace(/\r\n/g,'\n').replace(/\r/g,'');
				it("should compile markdown documentation",function(done){
					var moxStream = gulpMox();
					moxStream.write(file);

					moxStream.once('data',function(file){
						var actualData = file.contents.toString().replace(/\r\n/g,'\n').replace(/\r/g,'');
						assert.equal(actualData,expectedData);
						done();
					});
				});
				it("should rename path to markdown type",function(done){
					var moxStream = gulpMox();
					moxStream.write(file);

					moxStream.once('data',function(file){
						assert.equal(file.relative,'functionSomeClass.md');
						done();
					});
				});
			});
			describe("Given we are using a package version option",function(){
				var expectedData = fs.readFileSync(__dirname+'/expected/defaultWithPackageInfo.md','utf8').replace(/\r\n/g,'\n').replace(/\r/g,'');
				it("should compile markdown documentation",function(done){
					var moxStream = gulpMox({
									name : "PackageName",
									version : "v0.0.1"
								});
					moxStream.write(file);

					moxStream.once('data',function(file){
						var actualData = file.contents.toString().replace(/\r\n/g,'\n').replace(/\r/g,'')
						assert.equal(actualData,expectedData);
						done();
					});
				});
				it("should rename path to markdown type",function(done){
					var moxStream = gulpMox();
					moxStream.write(file);

					moxStream.once('data',function(file){
						assert.equal(file.relative,'functionSomeClass.md');
						done();
					});
				});
			});
		});
		describe("Given a stream",function(){
			it("should throw gulp error",function(done){
				var expectedData = fs.readFileSync(__dirname+'/expected/default.md','utf8').replace(/\r\n/g,'\n').replace(/\r/g,'');
				var fileData = fs.createReadStream(__dirname+'/fixtures/functionSomeClass.js');
				
				var file = new File({
					cwd: __dirname,
					base: __dirname+'/fixtures/',
					path: __dirname+'/fixtures/functionSomeClass.js',
					contents: fileData
			    });
				var moxStream = gulpMox();
				moxStream.on('error',function(){
					assert(true,'Should emit error');
					done();
				});

				moxStream.write(file);
			});
		});
		describe("Given mox error",function(){
				it("should throw gulp error",function(done){
					var expectedData = fs.readFileSync(__dirname+'/expected/default.md','utf8').replace(/\r\n/g,'\n').replace(/\r/g,'');
					
					var file = new File({
						cwd: __dirname,
						base: __dirname+'/fixtures/',
						path: __dirname+'/fixtures/notExists',
						contents: new Buffer('')
				    });
					var moxStream = gulpMox();
					moxStream.on('error',function(error){
						assert(true,'Should emit error');
						done();
					});

					moxStream.write(file);
				});
			});
	});
};