const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tasks = new Schema({
  project: String,
  description: String,
});

const Task = mongoose.model('Task', Tasks);

exports.add = (project, description) => {
  var task = new Task();
  task.project = project;
  task.description = description;
  task.save((err) => {
    if (err) throw err;
    console.log('insert task success');
  })
}
