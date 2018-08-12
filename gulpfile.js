const gulp         = require('gulp'),
      $            = require('gulp-load-plugins')(),
      fs           = require('fs'),
      package      = JSON.parse(fs.readFileSync('./package.json')),
      argv         = require('yargs').argv,
      critical     = require('critical').stream,
      webpack      = require('webpack-stream'),
      browserSync  = require('browser-sync').create();


const ENVIRONMENT = argv.production ? 'production' : 'development';


console.log('\x1b[33m%s %s\x1b[0m\n  ⇒ %s', ' ',
    ENVIRONMENT.toUpperCase(),
    package.name + ' v' + package.version);



gulp.task('html', () => {
    return gulp.src('src/pug/pages/*.pug')
        .pipe($.pug({ pretty: true }))
        .pipe($.realFavicon.injectFaviconMarkups(
            JSON.parse(fs.readFileSync('faviconData.json')).favicon.html_code))
        .pipe($.injectSvg())
        .pipe(critical(require('./critical.config.js')))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});



gulp.task('css', () => {
    return gulp.src('./src/less/main.less')
        .pipe($.if(ENVIRONMENT === 'development', $.sourcemaps.init()))
        .pipe($.less())
        .pipe($.postcss())
        .pipe($.cssnano({ discardComments: { removeAll: true }}))
        .pipe($.if(ENVIRONMENT === 'development', $.sourcemaps.write()))
        .pipe($.rename('main.min.css'))
        .pipe($.size({ showFiles: true }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});



gulp.task('js', () => {
    if (ENVIRONMENT === 'production') {
        gulp.src('./src/js/*.js')
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.eslint.failAfterError());
    }

    return gulp.src('./src/js/main.js')
        .pipe(webpack(require('./webpack.config.js')[ENVIRONMENT]))
        .pipe($.rename('main.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});



gulp.task('muilessium', (done) => {
    gulp.src('node_modules/muilessium/dist/css/muilessium.min.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/muilessium/dist/js/muilessium.min.js')
        .pipe(gulp.dest('dist/js'));

    done();
});



gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});



gulp.task('favicon', (done) => {
    $.realFavicon.generateFavicon(
        require('./favicon.config.js'), () => {
            done();
        }
    );
});



gulp.task('clean-dist', () => {
    return gulp.src('./dist', { read: false })
        .pipe($.clean());
});



gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch([
        'src/pug/*.pug',
        'src/pug/*/*.pug'
    ], gulp.parallel('html'));

    gulp.watch([
        'src/less/*.less',
        'src/less/*/*.less'
    ], gulp.parallel('css', 'html'));

    gulp.watch([
        'src/js/*.js',
        'src/js/*/*.js'
    ],  gulp.parallel('js'));

    gulp.watch([
        'src/images/*'
    ], gulp.parallel('images'));

    gulp.watch([
        'src/images/favicon.png'
    ], gulp.parallel('favicon'));
});




gulp.task('default', (done) => {
    if (ENVIRONMENT === 'production') {
        gulp.series(
            'clean-dist',
            'favicon',
            'css',
            'muilessium',
            'html',
            'js',
            'images'
        )();
    } else {
        gulp.series(
            'favicon',
            'css',
            'muilessium',
            'html',
            'js',
            'images'
        )();
    }

    done();
});

gulp.task('server', gulp.series('default', 'browser-sync'));

