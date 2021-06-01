const { src, watch, dest, parallel } = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const spawn = require("cross-spawn");

const compileSass = () =>
	src("src/**/*.scss", { base: "./" }).pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(sourcemaps.write()).pipe(dest("."));

const watchSass = () => watch(["src/**/*.scss"], compileSass);

const serveAngular = (cb) => spawn("ng ", ["serve", "--project=pateo-lima", "--aot"], { stdio: "inherit", cwd: ".", shell: true });

exports.build = compileSass;

exports.serve = parallel(watchSass, serveAngular);
