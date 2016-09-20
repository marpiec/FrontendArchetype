var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var merge = require('merge2');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var karmaServer = require('karma').Server;
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulpFilter = require('gulp-filter');
var folders = require('gulp-folders');
var gutil = require('gulp-util');


var buildDir = function(path) {return './build/' + path};
var tmpDir = function(path) {return './build/tmp/' + path};
var testTmpDir = function(path) {return './build/tmp/test/' + path};
var appDir = function(path) {return './app/' + path};
var srcDir = function(path) {return './app/src/' + path};
var libsDefinitionsDir = function(path) {return './app/libs.d/' + path};
var stylesDir = function(path) {return './app/styles/' + path};
var npmModulesDir = function(path) {return './node_modules/' + path};
var releaseDevDir = function(path) {return './build/releaseDev/' + path};
var releaseDir = function(path) {return './build/release/' + path};

var npmDependency = function(dependency, dependencyMinimized, minimized) {return minimized ? npmModulesDir(dependencyMinimized) : npmModulesDir(dependency)};

// HTML
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest(releaseDevDir('')))
});


gulp.task('scripts-libs', function() {
    var min = ''; // TODO fix min as different files have different notation
    return gulp.src([
        npmDependency('react/dist/react.js', 'react/dist/react.min.js', true), // React
        npmDependency('react-dom/dist/react-dom.js', 'react-dom/dist/react-dom.min.js', true), // DOM manipulation with React
        npmDependency('history/umd/history.js', 'history/umd/history.min.js'), // TODO ???
        npmDependency('react-router/umd/ReactRouter.js', 'react-router/umd/ReactRouter.min.js', true),
        npmDependency('redux/dist/redux.js', 'redux/dist/redux.min.js', true),
        npmDependency('classnames/index.js', 'classnames/index.js', false), // Easy css class names manipulation for React
        npmDependency('jquery/dist/jquery.js', 'jquery/dist/jquery.min.js', true), // JQuey
        npmDependency('immutable/dist/immutable.js', 'immutable/dist/immutable.min.js', true), // Immutable collections
        npmDependency('lodash/lodash.js', 'lodash/lodash.min.js', true) // Utility library // TODO split it?
    ]).pipe(concat('libs.js')).pipe(gulp.dest(releaseDevDir('scripts/')))
});


gulp.task('scripts', function () {

    var tsResult = gulp.src([srcDir('**/*.ts*'), libsDefinitionsDir('**/*.d.ts')])
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts({
            'module': 'amd',
            'noImplicitAny': true,
            'removeComments': true,
            'preserveConstEnums': true,
            'declaration': true,
            'target': 'ES5',
            'jsx': 'React',
            sortOutput: true,
            gulpConcat: true,
            gulpSourcemaps: true,
            noExternalResolve: true,
            typescript: typescript
        }));


    return merge([
        tsResult.dts.pipe(concat('main.d.ts')).pipe(gulp.dest(releaseDevDir('scripts'))),
        tsResult.js
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write("../maps")) // Now the sourcemaps are added to the .js file
            .pipe(gulp.dest(releaseDevDir('scripts')))
    ]);
});


gulp.task('test-scripts', function () {

    var tsResult = gulp.src([appDir('scripts/test/**/*.ts'), appDir('scripts/test/libs.d/**/*.d.ts'),
                             appDir('scripts/main/utils/*.ts*'), appDir('scripts/main/libs.d/**/*.d.ts')],
                            {base: appDir('scripts')})
        .pipe(ts({
            'module': 'amd',
            'noImplicitAny': true,
            'removeComments': true,
            'preserveConstEnums': true,
            'declaration': true,
            'target': 'ES5',
            'jsx': 'React',
            sortOutput: true,
            gulpConcat: true,
            gulpSourcemaps: true,
            noExternalResolve: true,
            typescript: typescript
        }));


    return merge([
        tsResult.dts.pipe(gulp.dest(testTmpDir('scripts'))),
        tsResult.js.pipe(gulp.dest(testTmpDir('scripts')))
    ]);
});



gulp.task('styles', function () {
    gulp.src(stylesDir('**/*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(releaseDevDir('styles')));
});

// HTML
gulp.task('fonts', function() {
    return gulp.src([npmModulesDir('font-awesome/fonts/*')])
        .pipe(gulp.dest(releaseDevDir('fonts')))
});


gulp.task('test', ['test-scripts'], function (done) {
    return new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


// Static server
gulp.task('browser-sync', ['scripts'], function() {
    browserSync.init({
        server: {
            baseDir: releaseDevDir('')
        }
    });

    gulp.watch(appDir('**/*.ts*'), ['scripts']);
    gulp.watch(appDir('**/*.scss'), ['styles']);
    gulp.watch(appDir('**/*.html'), ['html']);
    gulp.watch(appDir('**/*.html')).on('change', browserSync.reload);
});


gulp.task('clean', function() {
    return merge([
        gulp.src(buildDir(''), {read: false}).pipe(clean()),
        gulp.src(tmpDir(''), {read: false}).pipe(clean()),
        gulp.src(testTmpDir(''), {read: false}).pipe(clean()),
        gulp.src(releaseDevDir(''), {read: false}).pipe(clean()),
        gulp.src(releaseDir(''), {read: false}).pipe(clean())]);
});


gulp.task('clean-release', function() {
   return gulp.src(releaseDir('')).pipe(clean());
});

gulp.task('revision', ['clean-release', 'html', 'scripts-libs', 'scripts', 'styles', 'fonts'], function() {
    const revisionedFilter = gulpFilter(['**/*.*', '!index.html'], {restore: true});
    const nonRevisionedFilter = gulpFilter(['index.html']);
    return gulp.src([releaseDevDir('**/*')])
        .pipe(revisionedFilter)
        .pipe(rev())
        .pipe(gulp.dest(releaseDir('')))
        .pipe(rev.manifest())
        .pipe(gulp.dest(buildDir('')))
        .pipe(revisionedFilter.restore)
        .pipe(nonRevisionedFilter)
        .pipe(gulp.dest(releaseDir('')))

});

gulp.task("revreplace", ["revision"], function(){
    var manifest = gulp.src(buildDir('rev-manifest.json'));

    return gulp.src(releaseDir('**/*.*'))
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(releaseDir('')));
});

gulp.task('release', ['default', 'revreplace']);

gulp.task('default', ['html', 'scripts-libs', 'scripts', 'styles', 'fonts']);

gulp.task('server', ['default', 'browser-sync']);