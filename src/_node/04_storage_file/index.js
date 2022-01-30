const fs = require('fs');
const path = require('path');


const args = process.argv.splice(2);
const command = args.shift();
const taskDescription = args.join(' ');
// const file = path.join(process.cwd, '/.tasks');
const file = path.join(__dirname, '/.tasks');

switch(command) {
  case 'list': {
    listTasks(file);
    break;
  }
  case 'add': {
    addTask(file, taskDescription);
    break;
  }
  default: {
    console.log('Usage: '+ process.argv[0] + ' list|add [task description] ')
  }
}

function loadOrInitTaskList(file, cb) {
  const isFileExists = fs.existsSync(file);
  if (isFileExists) {
    fs.readFile(file, (err, result) => {
      if (err) throw err;
      const data = result.toString();
      const tasks = JSON.parse(data || '[]');
      cb(tasks);
    });
  } else {
    cb([]);
  }
}

function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf-8', (err) => {
    if (err) throw err;
    console.log('Saved.');
  })
}

function listTasks(file) {
  loadOrInitTaskList(file, (tasks) => {
    for (let i in tasks) {
      console.log(tasks[i]);
    }
  })
}

function addTask(file, task) {
  loadOrInitTaskList(file, (tasks) => {
    tasks.push(task);
    storeTasks(file, tasks);
  });
}
