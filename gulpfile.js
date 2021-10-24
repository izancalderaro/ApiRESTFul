/** @format */

const {
	series,
	parallel,
	src,
	dest
} = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject(
	'tsconfig.json',
	{
		noImplicitAny: true
	}
);

const limparDist = cb => {
	return src('dist', {
		read: false,
		allowEmpty: true
	}).pipe(clean());
};

function copiarConfigUnit(cb) {
	return src(
		'tests/unit/config/.mocharc.json'
	).pipe(dest('dist/unit/config'));
}

function copiarConfigIntegration(cb) {
	return src(
		'tests/integration/config/.mocharc.json'
	).pipe(dest('dist/integration/config'));
}

function gerarJSApi(cb) {
	return src(['src/**/*.ts', 'tests/**/*.ts'])
		.pipe(tsProject())
		.js.pipe(dest('dist'));
}

exports.default = series(
	limparDist,
	parallel(
		gerarJSApi,
		copiarConfigUnit,
		copiarConfigIntegration
	)
);

// gulp.task('compile', ['clean'], function () {
// 	return tsProject
// 		.src()
// 		.pipe(tsProject())
// 		.js.pipe(gulp.dest('dist'));
// });
// gulp.task('compile', ['clean-folder'], function () {
// 	return gulp
// 		.src(['tests/**/*.ts', 'src/**/*.ts'])
// 		.pipe(tsProject())
// 		.js.pipe(gulp.dest('dist'));
// });

// gulp.task('clean-folder', function () {
// 	return gulp.src('dist', { read: false }).pipe(clean());
// });

// gulp.task('copy-json', ['clean', 'compile'], function () {
// 	return gulp
// 		.src('tests/unit/config/.mocharc.json')
// 		.pipe(gulp.dest('dist/tests/unit/config'))
// 		.pipe(gulp.dest('dist/tests/integration/config'));
// });

// gulp.task('default', ['compile'], () => {});
