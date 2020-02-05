'use strict'

// variables

var gulp 			= require('gulp'),
	del 			= require('del'),
	rename			= require('replace'),
	pug 			= require('gulp-pug'),
	less 			= require('gulp-less'),
	pug 			= require('gulp-pug'),
	notify 			= require("gulp-notify"), 			// Уведомления об ошибках
	lessImport 		= require('gulp-less-import'), 		// Ебаный импорт
	browserSync 	= require('browser-sync'),
	imagemin 		= require('gulp-imagemin'), 		// Подключаем библиотеку для работы с изображениями
	pngquant 		= require('imagemin-pngquant'), 	// Подключаем библиотеку для работы с png
	cache 			= require('gulp-cache'), 			// Подключаем библиотеку кеширования
	spritesmith 	= require('gulp.spritesmith'),
	clean 			= require('gulp-clean'),
	concat 			= require('gulp-concat'),
	autoprefixer 	= require('gulp-autoprefixer'), 	// Библиотека для автоматического добавления префиксов
	cleanCSS = require('gulp-clean-css'),
	htmlbuild = require('gulp-htmlbuild'),
	rep = require('gulp-replace-image-src'),
	flatten = require('gulp-flatten');

// pug to html

gulp.task('pug', function(){
	return gulp.src('app/**/*.pug')
		.pipe(pug({
			pretty: true 								// Не сжимает страницу на выходе!
		}))
		.on('error', notify.onError(function(err) {
			return {
				title: 'Html',
				message: err.message
			}
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
})

// less to css

gulp.task('less', function(){
	return gulp.src('app/**/*.less')
		.pipe(lessImport('styles/style.less'))
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы

		.on('error', notify.onError(function(err) {
			return {
				title: 'Styles',
				message: err.message
			}
		}))

		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({stream: true}))
})

// browserSync

gulp.task('browser-sync', function() {
	browserSync({ 
		server: true,
		server: { 
			baseDir: 'app/', 	// Директория  в которой лежат доступные страницы
			index: "pages/index.html" 	// Начальная странице при обращении к localhost
		},
		notify: false,
		open: false
	})
})

// watcher

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('app/**/*.pug', ['pug']);
	gulp.watch('app/**/*.less', ['less']);
	//gulp.watch('dev/../img/**/*.*', ['png']);
	gulp.watch('app/**/*.css', browserSync.reload);
	gulp.watch('app/pages/*.html', browserSync.reload);
})

// Удаление старых файлов
gulp.task('sprite-clean', function () {
    del(['app/../img/sprite-*.png']);
})

// create sprite from icons

// -- random vaules 1, 100

const getRandomIntInRange = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) ) + min

gulp.task('sprite', ['sprite-clean'], function() {
	var fileName = 'sprite-' + getRandomIntInRange(1, 100) + '.png';

    var spriteData = 
        gulp.src('app/../img/icons/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: fileName,
                cssName: 'sprite.less',
                padding: 2,
                cssFormat: 'less',
                algorithm: 'binary-tree', // алгоритм, по которому выстраивает изображения
                cssVarMap: function(sprite) {
                    sprite.name = 'l-' + sprite.name
                },
                imgPath: '../img/' + fileName,
            }));

    spriteData.img.pipe(gulp.dest('app/../img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/styles/helpers')); // путь, куда сохраняем стили
})

// optimize images

gulp.task('img', function() {
	return gulp.src('app/img/**/*.*') // Берем все изображения из dev
		// .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
		// 	interlaced: true,
		// 	progressive: true,
		// 	svgoPlugins: [{removeViewBox: false}],
		// 	use: [pngquant()]
		// })))
		.pipe(gulp.dest('dist/img')); // Выгружаем в pub
})

gulp.task('fontss', function() {
	return gulp.src('app/fonts/*.*') // Берем все изображения из dev
		// .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
		// 	interlaced: true,
		// 	progressive: true,
		// 	svgoPlugins: [{removeViewBox: false}],
		// 	use: [pngquant()]
		// })))
		.pipe(gulp.dest('dist/fonts')); // Выгружаем в pub
})

gulp.task('folder', function () {
    return del.sync(['dist/styles/libs', 'dist/blocks'])
})

// optimize css

gulp.task('css', function() {
    return gulp.src(['app/styles/**/*.less'])
        .pipe(concat('style.min.less')) // Собираем их в кучу в новом файле
        .pipe(gulp.dest('dist/styles')) // Выгружаем в папку pub/styles
})

// development (watch + browserSync)

gulp.task('dev', ['watch'])

// clean public

gulp.task('clean-dev', function () {
    del(['app**/*.html', 'app/**/*.css', 'dist/blocks'])
})

gulp.task('js-min', function() {
    return gulp.src(['app/js/libs/**/*.js'])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'))
})

gulp.task('css-min', function() {
    return gulp.src(['app/styles/libs/**/*.css'])
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('dist/styles'))
})

gulp.task('concat', function () {
	gulp.src(['app/pages/index.html'])
		.pipe(htmlbuild({
		  js: htmlbuild.preprocess.js(function (block) {
		block.write('../js/vendor.min.js');
		block.end();
			
	  }),
	  css: htmlbuild.preprocess.css(function (block) {
		block.write('../styles/vendor.min.css');
		block.end();
	  })
	}))
	.pipe(gulp.dest('dist/pages'));
});

  gulp.task('replace', function() {
	gulp.src('dist/pages/index.html')
	  .pipe(rep({
		prependSrc : '../img/',
		keepOrigin : false
	  }))
	  .pipe(gulp.dest('dist/pages'));
  });

  gulp.task('img-min', function() {
	gulp.src('app/**/*')
	.pipe(flatten({ includeParents: 0 }))
	
	.pipe(gulp.dest('dist/img'));
})

// clean public

gulp.task('clean-dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
})

//svg sprite
var svgSprite = require('gulp-svg-sprite');

gulp.task('svgSprite', function () {
    return gulp.src('app/../img/svg/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('app/../img/sprite/'));
});

// CSS MINIFY

gulp.task('cssmin', function () {

	return gulp.src('dist/styles/**/*.css')
	  .pipe(cleanCSS({
		  debug: true,
		  compatibility: 'ie8',
		  level: {
			  1: {
				  specialComments: 0,
			  },
		  },
	  }))
	  .pipe(autoprefixer({
		  browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
		  cascade: false
	  }))
	  .pipe(rename({
		  basename: 'main-styles',
		  suffix: '.min',
	  }))
	  .pipe(gulp.dest('dist/styles'))
});

// build

gulp.task('build', ['clean-dist', 'pug', 'less', ], function() {

    var buildFonts = gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'))

    var buildJS = gulp.src('app/js/*.*')
    .pipe(gulp.dest('dist/js'))

    var buildImg = gulp.src('app/../img/**/*.*')
    .pipe(gulp.dest('dist/img'))

    var buildCss = gulp.src('app/styles/**/*.css')
    .pipe(gulp.dest('dist/styles'))

    var buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('build-full', ['css-min', 'js-min', 'concat', 'img', 'fontss', 'folder'], function() {})