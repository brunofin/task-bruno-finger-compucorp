var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  prettify = require('gulp-jsbeautifier'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require("gulp-rename"),
  del = require('del'),
  inject = require('gulp-inject'),
  path = require('path'),
  concat = require('gulp-concat'),
  minify = require('gulp-minify'),
  jsValidate = require('gulp-jsvalidate');

  var project = {
    scssSrcFolder: 'scss',
    jsSrcFolder: 'app',
    jsOutputName: 'app.js',
    jsLibs: [
      "bower_components/angular/angular.js",
      "bower_components/angular-messages/angular-messages.js",
      "bower_components/angular-animate/angular-animate.js",
      "bower_components/angular-aria/angular-aria.js",
      "bower_components/angular-route/angular-route.js",
      "bower_components/angular-material/angular-material.js",
      "bower_components/angular-translate/angular-translate.js",
      "bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js"
    ]
  };

  gulp.task('lint-js', function() {
    return gulp.src('src/' + project.jsSrcFolder + '/**/*.js')
      .pipe(jsValidate());
  });

  gulp.task('clean-last-build', function() {
    // note that del isn't a gulp plugin, but a pure nodejs function
    return del(['dist/**/*.*', '!.gitignore']);
  });

  gulp.task('prepare-deploy', ['clean-last-build', 'lint-js'], function() {
    return gulp.src('src/**/*.*').pipe(gulp.dest('dist/'));
  });


  gulp.task('minify-css', ['prepare-deploy'], function() {
    return minifyScss();
  });

  gulp.task('minify-js', ['minify-css'], function() {
    gutil.log('Generating JS');

    var sources = project.jsLibs.map(function(lib) {
      return 'dist/' + lib;
    }).concat('dist/' + project.jsSrcFolder + '/**/*.js');

    return gulp.src(sources)
      .pipe(concat(project.jsOutputName))
      .pipe(minify({
        mangle: false
      }).on('error', function(e) {
        gutil.log(e);
        throw e;
      }))
      .pipe(rename((function() {
        var a = project.jsOutputName.split('.');
        a.splice(1, 0, 'min');
        return a.join('.');
      })()))
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('inject-dependencies', ['minify-js'], function() {
    return injectDependencies();
  })

  gulp.task('clean', ['inject-dependencies'], function(cb) {
    del([
      'dist/bower_components',
      'dist/*.map',
      'dist/index.src.html',
      'dist/' + project.scssSrcFolder,
      'dist/' + project.jsSrcFolder,
      'dist/' + project.jsOutputName
    ]).then(function() {
      cb();
    });
  });

  gulp.task('deploy', ['clean'], function() {
    gutil.log('Deployed files to "./dist".');
  });


  var minifyScss = function(debug) {
    if (debug === undefined) {
      debug = false
    }

    gutil.log('Generating CSS, debug: ' + debug);

    var stream = gulp.src((debug ? 'src/' : 'dist/') + project.scssSrcFolder + '/*.scss');

    if (debug) {
      stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(sass({
      style: (debug ? 'expanded' : 'compressed')
    }).on('error', sass.logError));

    stream = stream.pipe(rename('app.min.css'));

    if (debug) {
      stream = stream.pipe(sourcemaps.write('.'));
    }

    stream = stream.pipe(gulp.dest(debug ? 'src/' : 'dist/'));

    return stream;
  }

  var injectDependencies = function(debug) {
    if (debug === undefined) {
      debug = false
    }

    gutil.log('Injecting dependencies into index.html, debug: ' + debug);

    var target = gulp.src((debug ? 'src/' : 'dist/') + 'index.src.html');
    var sources = null;

    if (debug) {
      sources = gulp.src(project.jsLibs.map(function(lib) {
        return 'src/' + lib;
      }).concat('src/' + project.jsSrcFolder + '/**/*.js').concat('src/app.min.css'));
    } else {
      sources = gulp.src(['dist/*.min.*']);
    }

    return target.pipe(rename('index.html'))
      .pipe(inject(sources, {
        relative: true
      }))
      .pipe(gulp.dest(debug ? 'src/' : 'dist/'));
  }
