const gulp = require("gulp");
const typescript = require("gulp-typescript");

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());

        gulp.start("assets");

    return tsResult.js.pipe(gulp.dest('dist'));
})

gulp.task('assets', function() {
    return gulp.src(['src/*.json', 'src/**/*.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch', 'assets']);
