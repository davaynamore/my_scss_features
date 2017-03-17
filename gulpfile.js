var gulp            = require('gulp'),
    csscomb         = require('gulp-csscomb'),
    autoprefixer    = require('gulp-autoprefixer'),
    notify          = require('gulp-notify'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass().on( 'error', notify.onError({message: "<%= error.message %>", title  : "Sass Error!"})))
    .pipe(autoprefixer(['last 30 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('html', function(){
    return gulp.src('index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    startBrowserSync(srcPath);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['watch']);

var srcPath = './dist';

function startBrowserSync(basePaths) {
    if(typeof basePaths === 'string') basePaths = [basePaths];
    var filesToWatch = [];
    basePaths.forEach(function(path){
        filesToWatch.push(path + '/**/*.html');
        filesToWatch.push(path + '/**/*.css');
        filesToWatch.push(path + '/**/*.js');
        filesToWatch.push(path + '/**/*.jpg');
        filesToWatch.push(path + '/**/*.png');
        filesToWatch.push(path + '/**/*.svg');
        filesToWatch.push(path + '/**/*.eot');
        filesToWatch.push(path + '/**/*.ttf');
        filesToWatch.push(path + '/**/*.woff');
        filesToWatch.push(path + '/**/*.woff2');
        filesToWatch.push(path + '/**/*.json');
        filesToWatch.push('index.html');
    });
    var options = {
        port: 5000,
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0,
        online: false,
        server: {
            baseDir: basePaths
        },
        files: filesToWatch
    };
    browserSync(options);
}