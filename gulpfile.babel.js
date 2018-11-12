"use strict" ; 

import 'babel-polyfill';
import gulp from 'gulp' ; 
import del from 'del' ; 
import webpack from 'gulp-webpack' ; 
import sass from 'gulp-sass' ; 
import cleanCSS from 'gulp-clean-css' ; 
import htmlmin from 'gulp-htmlmin' ; 
import imagemin from 'gulp-imagemin' ; 
import nodemon from 'gulp-nodemon' ; 
import Cache from 'gulp-file-cache' ; 
import babel from 'gulp-babel' ; 
import browserSync from 'browser-sync' ; 
import ejsmin from 'gulp-ejsmin' ; 
import fs from 'fs' ; 
import { PATH } from './Dir' ; 
import spritesmith from 'gulp.spritesmith' ; 
import mergeStream from 'merge-stream' ; 
import mustache from 'mustache' ; 
import runSequence from 'run-sequence' ; 

import dir from 'node-dir' ; 

let fileArr_js = [] ; 
let cache = new Cache() ; 
let DIR = PATH.DIR ;
let SRC = PATH.SRC ; 
let DEST = PATH.DEST ; 
let FILENAME = PATH.FILENAME ; 

gulp.task( 'clean' , () => {
	return del.sync( DIR.DEST ) ; 
}) ; 

gulp.task( 'webpack' , () => {
	fs.readdir( 'html/js/' , ( err , fls ) => {
		console.log( err ) ; 
		let arr = [] ; 
		fls.forEach(( file ) => {
			if ( file.indexOf( '.js' ) > -1 ) {
				// console.log( 'file : ' , file ) ; 
				let evt = { path : __dirname + '\\html\\js\\' + file } ; 				
				webpackFun( evt ) ; 
			}
		}) ;  
	}) ; 
}) ;  

gulp.task( 'sass' , () => {
	return gulp.src( DIR.SRC + '/scss/*.scss' )
		.pipe( cache.filter() )
		.pipe( sass() )
		.pipe( cache.cache() )
		.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
})

gulp.task( 'css' , [ 'sass' ] , () => {
	return gulp.src( SRC.CSS )
		.pipe( cache.filter() )
		.pipe( cleanCSS({ compatibility : 'ie8' }))
		.pipe( cache.cache() )
		.pipe( gulp.dest( DEST.CSS ) ) ; 
}) ; 

gulp.task( 'html' , () => {
	return gulp.src( SRC.HTML )
		.pipe( htmlmin({ collapceWhitespace : true }))
		.pipe( gulp.dest( DEST.HTML )) ; 
}) ; 

gulp.task( 'ejs' , () => {
	return gulp.src( SRC.EJS )
		.pipe( gulp.dest( DEST.EJS )) ; 
}) ; 

gulp.task( 'copy-lib' , () => {
	return gulp.src( SRC.LIB )
		.pipe( gulp.dest( DEST.LIB )) ; 
}) ; 

gulp.task( 'copy-json' , () => {
	return gulp.src( SRC.JSON )
		.pipe( gulp.dest( DEST.JSON )) ; 
}) ; 

gulp.task( 'copy-images' , [ 'images' , 'images-sprite' ] , () => {
	console.log( 'images copy complete' ) ; 
}) ; 

let createSpriteOptions = function ( dirName ) {
	let mustacheTemplate = './template/sp-mosaic.mustache' ; 
	let spriteOptions = {
		cssOpts : {
			zerounit : function () {
				return function ( text , render ) {
					let value = render(text) ; 
					// return value ; 
					return '0px' === value ? '0' : value ; 
				}
			}
		} , 
		padding : 4 , 
		algorithm : 'binary-tree' , 
		cssTemplate : function ( params ) {
			let template = fs.readFileSync(mustacheTemplate, { encoding : "utf-8" });
			return mustache.render(template, params);
		} , 
		imgPath : '../images/sprite/' + '/sp-' + dirName + '.png' , 
		imgName : 'sp-' + dirName + '.png' , 
		cssName : 'sp-' + dirName + '.scss' , 
		cssSpritesheetName : 'sp-' + dirName  
	} ; 
	return spriteOptions ; 
} ; 

gulp.task( 'images-sprite' , () => {
	fs.readdir( SRC.SPRITE + '/' , ( err , fls ) => {
		let arr = [] ; 

		fls.forEach(( dirName ) => {
			let spriteData = gulp.src( SRC.SPRITE + '/' + dirName + '/*.png' )
				.pipe( spritesmith( createSpriteOptions( dirName ) ) ) ; 

			let imgStream = spriteData.img
				.pipe( gulp.dest( 'html_build/images/sprite' ) ) ; 

			let cssStream = spriteData.css
				.pipe( gulp.dest( DIR.SRC + '/scss/ui/sprite' ) ) ; 

			return mergeStream( imgStream , cssStream ) ; 
		}) ;  
	}) ; 

}) ; 

gulp.task( 'images' , () => {
	return gulp.src( [SRC.IMAGES , '!' + SRC + '/images/sprite' ] )
		.pipe( gulp.dest( DEST.IMAGES )) ; 
}) ;

gulp.task( 'babel' , () => {
	return gulp.src( SRC.SERVER )
		.pipe( babel({			
			"presets" : ['es2015', 'es2017', 'stage-3'],
			"plugins" : [
				'transform-decorators-legacy', 
				'transform-class-properties' ,
				'transform-async-to-generator' , 
				'transform-object-assign' , 
				'transform-regenerator' , 
				["transform-runtime", {
					"helpers": false, // defaults to true 
					"polyfill": false, // defaults to true 
					"regenerator": true, // defaults to true 
					"moduleName": "babel-runtime" // defaults to "babel-runtime" 
				}]
			],
		}))
		.pipe( gulp.dest( DEST.SERVER ) ) ; 
}) ; 

gulp.task( 'start' , [ 'babel' ] , () => {
	return nodemon({
		script : DEST.SERVER + '/app.js' , 
		watch : DEST.SERVER 
	})
}) ; 

function webpackFun ( evt ) {
	// console.log( '---- evt : ' , evt ) ; 
	let path = evt.path ; 
	let jsName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ) ; 
	let entryName = {} ; 
	let entryPath = {} ; 

	// console.log( 'jsName : ' , jsName ) ; 
	// console.log( 'path : ' , path ) ; 

	if ( path.indexOf( 'ui' ) == -1 ) { /* 상위 */

		// console.log( 'entryName : ' , entryName ) ; 
		// console.log( 'entryPath : ' , entryPath ) ; 
		// console.log( 'jsName : ' , jsName ) ; 

		webpack({
			entry : {
				entryName : __dirname + '/html/js/' + jsName
			} , 
			output : {
				filename : jsName
			} , 
			module : {
				loaders : [
					{
						test : /\.js$/ , 
						loader : 'babel-loader' , 
						exclude : '/node_modules/' , 
						query : {
							cacheDirectory : true , 
							"presets" : ['es2015', 'es2017', 'stage-3', 'react'],
							"plugins" : [
								'transform-decorators-legacy', 
								'transform-class-properties' ,
								'transform-async-to-generator' , 
								'transform-object-assign' , 
								'transform-regenerator' , 
								["transform-runtime", {
									"helpers": false, // defaults to true 
									"polyfill": false, // defaults to true 
									"regenerator": true, // defaults to true 
									"moduleName": "babel-runtime" // defaults to "babel-runtime" 
								}]
							],
						}
					}
				]   
			} 
		}).pipe( gulp.dest( DEST.JS ) ) ; 
	} else { /* 하위 */
		// gulp.watch( SRC.JS , [ 'webpack' ] ) ; 
		fs.readdir( 'html/js/' , ( err , fls ) => {
			let arr = [] ; 
			fls.forEach(( file ) => {
				if ( file.indexOf( '.js' ) > -1 ) {
					// arr.push( file ) ; 
					// let evt = { path : __dirname + '\\html\\js\\' + file } ; 

					let filePath = __dirname + '\\html\\js\\' + file ; 
					let findStr = jsName.replace( '.js' , '' ) ; 
					// console.log( 'filePath : ' , filePath ) ; 
					// console.log( 'file : ' , file ) ; 
					// console.log( 'findStr : ' , findStr ) ; 

					fs.readFile( filePath , 'utf8' , ( err , data ) => {
						if ( err != null ) return console.log( 'err : ' , err ) ; 
						if ( data.indexOf( './ui/' + findStr ) != -1 ) {
							let evt = { path : __dirname + '\\html\\js\\' + file } ; 
							// console.log( 'evt : ' , evt ) ; 
							webpackFun( evt ) ; 
						}
					}) ; 
				}
			}) ;  
		}) ; 
	}
}

gulp.task( 'watch' , () => {
	function webpackCompile ( jsName ) {
		webpack({
			entry : {
				entryName : `${__dirname}/html/js/${jsName}.js`
			} , 
			output : {
				filename : `${jsName}.js`
			} , 
			module : {
				loaders : [
					{
						test : /\.js$/ , 
						loader : 'babel-loader' , 
						exclude : '/node_modules/' , 
						query : {
							cacheDirectory : true , 
							"presets" : ['es2015', 'es2017', 'stage-3', 'react'],
							"plugins" : [
								'transform-decorators-legacy', 
								'transform-class-properties' ,
								'transform-async-to-generator' , 
								'transform-object-assign' , 
								'transform-regenerator' , 
								["transform-runtime", {
									"helpers": false, // defaults to true 
									"polyfill": false, // defaults to true 
									"regenerator": true, // defaults to true 
									"moduleName": "babel-runtime" // defaults to "babel-runtime" 
								}]
							],
						}
					}
				]   
			} 
		}).pipe( gulp.dest( DEST.JS ) ) ; 
	}

	gulp.watch( SRC.EJS ).on( 'change' , ( evt ) => {
		if ( evt.path.lastIndexOf( '\\' ) == evt.path.length - 1 ) return ; 

		let re_path = evt.path.split( '\\' ) ; 
		let str = '' ; 
		re_path.forEach(function( elem , idx , arr ){
			if ( idx == 0 ) {
				str += elem ; 
			} else if ( idx < arr.length - 1 ) {
				if ( elem == 'html' ) {
					str += '\\\\html_build' ; 
				} else {
					str += '\\\\' + elem ; 
				}
			}
		}) ; 

		gulp.src( evt.path )
		.pipe(ejsmin({removeComment: true}))
		.pipe( gulp.dest( str )) ; 
	}) ; 
	
	gulp.watch( SRC.JS ).on( 'change' , ( evt ) => {
		/**현재 저장된 이벤트 패스(파일명 포함)를 변수에 담습니다.*/
		console.log( '\n\n' ) ; 
		console.log( '********************************' ) ; 
		console.log( '**** js watch start ****' ) ; 
		console.log( '********************************' ) ; 

		let evtPath = 'html' + evt.path.split( '\\html' )[1] ; 
		let originalPath = evtPath ; 
		let pathArr = originalPath.split( '\\' ) ; 
		let fileName = pathArr.pop().replace( /\.js$/ , '' ) ; 
		pathArr.shift() ; 
		let crntDatas = [
			{
				originalPath : originalPath , 
				fileName : fileName , 
				pathArr : pathArr , 
			} , 
		] ; 

		console.log( '===> crntDatas : \n' , crntDatas ) ; 
		console.log( '=======================' ) ; 

		function chkFileArrFunc ( file , cData ) {
			let p = new Promise(( resolve , reject ) => {
				fs.readFile( file.originalPath , 'utf8' , ( err , fileData ) => {
					let re = new RegExp( '^import.*?\/' + cData.fileName , 'gm' );
					let result = re.exec( fileData ) ; 
					console.log( 'zzzzzzzzzzzzzzzz' , result ) ; 
					if ( result != null ) {
						resolve( file ) ; 
					} else {
						resolve( null ) ; 
					}
				}) ; 

			}) ; 

			return p ; 
		}

		function chkDirArrFunc ( cData ) {
			let p = new Promise(( resolve , reject ) => {

				console.log( '===> cData.pathArr.length : \n' , cData.pathArr.length ) ; 
				console.log( '=======================' ) ; 

				if ( cData.pathArr.length == 1 ) {
					webpackCompile( cData.fileName ) ; 
				} else {
					let promises = [] ; 

					fileArr_js[cData.pathArr.length - 2].forEach(( fileInfo ) => {
						promises.push( chkFileArrFunc( fileInfo , cData ) ) ; 
					}) ; 

					Promise.all( promises ).then(( result ) => {
						result = result.filter(( rlstData ) => {
							return rlstData != null ; 
						}) ; 

						if ( result.length == 0 ) {
							let promises = [] ; 
							fileArr_js[cData.pathArr.length - 1].forEach(( fileInfo ) => {
								promises.push( chkFileArrFunc( fileInfo , cData ) ) ; 
							}) ; 

							Promise.all( promises ).then(( result ) => {
								result = result.filter(( rlstData ) => {
									return rlstData != null ; 
								}) ; 

								if ( result.length == 0 ) {
									console.log( 'import된 상위 js파일이 존재하지 않습니다. import 하고싶은 파일을 설정하여주십시오.' ) ; 
								} else {
									resolve( result ) ; 
								}
							}) ; 

						} else {
							resolve( result ) ; 
						}
					}) ; 
				}
			}) ; 

			return p ; 
		}

		function stepStart () {
			let promises = [] ; 
			crntDatas.forEach(( cData , idx ) => {
				promises.push( chkDirArrFunc( cData ) ) ; 
			}) ; 

			Promise.all( promises ).then(( result ) => {
				let resultDatas = result[0] ; 

				console.log( '===> resultDatas : \n' , resultDatas ) ; 
				console.log( '=======================' ) ; 

				resultDatas = resultDatas.filter(( data ) => {
					return data != null ; 
				})

				if ( resultDatas[0].pathArr.length > 1 ) {
					crntDatas = resultDatas ; 
					stepStart() ; 
				} else {
					console.log( '\n\n ------- end : file checked ------' ) ; 

					console.log( 'resultDatas : \n\n' , resultDatas ) ; 
					resultDatas.map(( rlstData , idx ) => {
						webpackCompile( rlstData.fileName ) ; 
					}) ; 

					console.log( '********************************' ) ; 
					console.log( '**** js watch end ****' ) ; 
					console.log( '********************************' ) ; 
					console.log( '\n\n' ) ; 
				}
			}) ; 
		}
		stepStart() ; 
	}) ; 

	gulp.watch( SRC.SCSS ).on( 'change' , ( evt ) => {
		let path = evt.path ; 
		let scssName = path.substr( path.lastIndexOf( '\\' ) + 1 , path.length ).replace( '.scss' , '' ) ; 

		if ( path.indexOf( 'ui' ) == -1 ) { /* 상위 */
			gulp.src( path )
			// .pipe( cache.filter() )
			.pipe( sass() )
			// .pipe( cache.cache() )
			.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
		} else { /* 하위 */
			fs.readdir( 'html/scss/' , ( err , fls ) => {
				let i = 0
				, findStr = 'ui/' + scssName 
				, len = fls.length 
				, arr = [] ; 

				function chkStr () {
					fs.readFile( 'html/scss/' + fls[i] , 'utf8' , ( err , data ) => {
						if ( i < fls.length - 1 ) {

							if ( data.indexOf( findStr ) > -1 ) {
								arr.push( fls[i] ) ; 
							}				

							i += 1 ; 				
							setTimeout(() => {
								chkStr() ; 
							}) ; 
						} else {
							arr.forEach(( str , idx ) => {
								gulp.src( DIR.SRC + '/scss/' + str )
								.pipe( cache.filter() )
								.pipe( sass() )
								.pipe( cache.cache() )
								.pipe( gulp.dest( DIR.SRC + '/css' ) ) ; 
							}) ; 
						}
					}) ; 
				}

				chkStr() ; 
			}) ; 
		}
	}) ; 

	gulp.watch( SRC.CSS ).on( 'change' , ( evt ) => {
		gulp.src( evt.path )
		.pipe( cache.filter() )
		.pipe( cleanCSS({ compatibility : 'ie8' }))
		.pipe( cache.cache() )
		.pipe( gulp.dest( DEST.CSS ) ) ; 
	}) ; 

	gulp.watch( SRC.LIB ).on( 'change' , ( evt ) => {
		gulp.src( evt.path )
		.pipe( gulp.dest( DEST.LIB )) ; 
	}) ; 

	gulp.watch( SRC.SERVER ).on( 'change' , ( evt ) => {
		gulp.src( SRC.SERVER )
		.pipe( cache.filter() )
		.pipe( babel({
			"presets" : ['es2015', 'es2017', 'stage-3'],
			"plugins" : [
				'transform-decorators-legacy', 
				'transform-class-properties' ,
				'transform-async-to-generator' , 
				'transform-object-assign' , 
				'transform-regenerator' , 
				["transform-runtime", {
					"helpers": false, // defaults to true 
					"polyfill": false, // defaults to true 
					"regenerator": true, // defaults to true 
					"moduleName": "babel-runtime" // defaults to "babel-runtime" 
				}]
			],
		}))
		.pipe( cache.cache() )
		.pipe( gulp.dest( DEST.SERVER ) ) ; 
	}) ; 
}) ; 

gulp.task( 'browser-sync' , () => {
	browserSync.init( null , {
		proxy : 'http://localhost:' + DIR.PORT , 
		port : 7000 
	}) ;  
}) ; 


gulp.task( 'dirchk-js' , () => {	
	/**현재 js 파일이 담겨있는 폴더의 트리주고를 json 으로 데이터화 합니다.*/

	function dataFolderConvertingFunc ( file ) {
		let arr = {} ; 
		arr.originalPath = file ; 
		arr.tmp_arr = file.split( '\\' ) ; 
		arr.fileName = arr.tmp_arr.pop() ; 
		arr.pathArr = arr.tmp_arr.splice( 0 , 1 ) ; 
		arr.pathArr = arr.tmp_arr ; 
		
		let pattern = /.\w+$/ ; 
		arr.fileName = arr.fileName.replace( pattern , '' ) ; 
		
		delete arr.tmp_arr ; 
		return arr ; 
	}

	dir.readFiles( 'html/js/' , function ( err , content , next ) {
		if (err) throw err;
		next();
	} , function(err, files){
		if (err) throw err;
		files.forEach( function ( file , idx ) {			
			let obj = dataFolderConvertingFunc( file ) ; 
			if ( fileArr_js[obj.pathArr.length - 1] == undefined ) {
				fileArr_js[obj.pathArr.length - 1] = [] ; 
			}
			fileArr_js[obj.pathArr.length - 1].push( obj ) ; 
		}) ; 
	}); 
}) ; 

gulp.task( 'default' , [] , () => {
	runSequence( 'clean' , 'webpack' , 'copy-images' , 'css' , 'html' , 'ejs' , 'copy-lib' , 'copy-json' , 
		'dirchk-js' , 
		'start' , 
		'browser-sync' , 
		'watch' , () => {
			gulp.watch( DIR.DEST + '/**/*.*' ).on( 'change' , ( evt ) => {
				browserSync.reload() ; 
			}) ; 
			gulp.watch( 'app/**/*.*' ).on( 'change' , ( evt ) => {
				browserSync.reload() ; 
			}) ; 
		}
	) ; 
}) ; 