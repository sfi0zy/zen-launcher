let gulp         = require('gulp'),
    fs           = require('fs'),
    run          = require('run-sequence'),
    argv         = require('yargs').argv,
    rename       = require('gulp-rename'),
    pug          = require('gulp-pug'),
    less         = require('gulp-less'),
    postcss      = require('gulp-postcss'),
    cssnano      = require('gulp-cssnano'),
    webpack      = require('webpack-stream'),
    realFavicon  = require('gulp-real-favicon'),
    injectSvg    = require('gulp-inject-svg'),
    critical     = require('critical').stream,
    browserSync  = require('browser-sync').create(),
    clean        = require('gulp-clean');


const ENVIRONMENT = argv.production ? 'production' : 'development';


gulp.task('html', () => {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(realFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync('faviconData.json')).favicon.html_code))
        .pipe(injectSvg())
        .pipe(critical(require('./critical.config.js')))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


gulp.task('css', () => {
    return gulp.src('./src/less/main.less')
        .pipe(less())
        .pipe(postcss())
        .pipe(cssnano({ discardComments: { removeAll: true }}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('js', () => {
    return gulp.src('./src/js/main.js')
        .pipe(webpack(require('./webpack.config.js')[ENVIRONMENT]))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});


gulp.task('muilessium', () => {
    gulp.src('node_modules/muilessium/dist/css/muilessium.min.css')
        .pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/muilessium/dist/js/muilessium.min.js')
        .pipe(gulp.dest('dist/js'));
});


gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});


gulp.task('favicon', (done) => {
    realFavicon.generateFavicon(
        require('./favicon.config.js'), () => {
            done();
        }
    );
});

gulp.task('clean-dist', () => {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
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
    ], ['html']);

    gulp.watch([
        'src/less/*.less',
        'src/less/*/*.less'
    ], ['css', 'html']);

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


gulp.task('server', ['browser-sync']);


if (ENVIRONMENT === 'production') {
    gulp.task('default', () => {
        run('clean-dist',
            'favicon',
            'css',
            'muilessium',
            'html',
            'js',
            'images');
    });
} else {
    gulp.task('default', () => {
        run('favicon',
            'css',
            'muilessium',
            'html',
            'js',
            'images',
            'server');
    });
}

