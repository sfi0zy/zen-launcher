var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    postcss     = require('gulp-postcss'),
    cssnano     = require('gulp-cssnano'),
    webpack     = require('webpack-stream'),
    realFavicon = require('gulp-real-favicon'),
    fs          = require('fs'),
    browserSync = require('browser-sync').create(),
    injectSvg   = require('gulp-inject-svg');



gulp.task('html', function() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(realFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync('faviconData.json')).favicon.html_code))
        .pipe(injectSvg())
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});


gulp.task('css', function() {
    return gulp.src('src/css/main.css')
        .pipe(postcss())
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});


gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});


gulp.task('muilessium', function() {
    gulp.src('node_modules/muilessium/dist/css/muilessium-0.1.21.min.css')
        .pipe(gulp.dest('build/css'));
    gulp.src('node_modules/muilessium/dist/js/muilessium-0.1.21.min.js')
        .pipe(gulp.dest('build/js'));
});


gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.stream());
});


gulp.task('favicon', function(done) {
    realFavicon.generateFavicon(
        require('./favicon.config.js'), function() {
            done();
        }
    );
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch([
        'src/pug/*.pug',
        'src/pug/*/*.pug'
    ], ['html']);

    gulp.watch([
        'src/css/*.css',
        'src/css/*/*.css'
    ], ['css']);

    gulp.watch([
        'src/js/*.js',
        'src/js/*/*.js'
    ],  ['js']);

    gulp.watch([
        'src/images/*'
    ], ['images']);

    gulp.watch([
        'src/images/favicon.png'
    ], ['favicon']);
});


gulp.task('default', ['favicon', 'html', 'css', 'js', 'muilessium', 'images']);
gulp.task('server',  ['default', 'browser-sync']);
