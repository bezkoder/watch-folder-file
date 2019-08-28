const Obserser = require('./services/observer');

var obserser = new Obserser();

const folder = 'Performance/logs';

obserser.on('file-added', log => {
  // In this step, you can do anything you want, like to push alert message to chatwork, slack...vv
  // I just print error message to console
  console.log(log.message);
});

obserser.watchFolder(folder);

const file = 'Performance/logs/info.log';

obserser.on('file-updated', log => {
  // In this step, you can do anything you want, like to push alert message to chatwork, slack...vv
  // I just print error message to console
  console.log(log.message);
});

obserser.watchFile(file);