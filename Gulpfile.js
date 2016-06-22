var gulp = require("gulp");
var tasks = require('./Gulpfile.taskConfig');

for (var name in tasks) {
    if (tasks.hasOwnProperty(name)) {
        gulp.task(name, tasks[name]);
    }
}
