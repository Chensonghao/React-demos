var gulp = require("gulp");
var tasksObj = require('./Gulpfile.taskConfig');
var tasks = [];
for (var name in tasksObj) {
    if (tasksObj.hasOwnProperty(name)) {
        tasks.push(name);
        gulp.task(name, tasksObj[name]);
    }
}
gulp.task('all', function() {
    gulp.run(tasks);
});
