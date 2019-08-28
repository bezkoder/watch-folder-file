const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const fsExtra = require('fs-extra');
const readLastLines = require('read-last-lines');

class Observer extends EventEmitter {
  constructor() {
    super();
  }

  watchFolder(folder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`
      );

      var watcher = chokidar.watch(folder, { persistent: true });

      watcher.on('add', async filePath => {
        if (filePath.includes('error.log')) {
          console.log(
            `[${new Date().toLocaleString()}] ${filePath} has been added.`
          );

          // Read content of new file
          var fileContent = await fsExtra.readFile(filePath);

          // emit an event when new file has been added
          this.emit('file-added', {
            message: fileContent.toString()
          });

          // remove file error.log
          await fsExtra.unlink(filePath);
          console.log(
            `[${new Date().toLocaleString()}] ${filePath} has been removed.`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  watchFile(targetFile) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`
      );

      var watcher = chokidar.watch(targetFile, { persistent: true });

      watcher.on('change', async filePath => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been updated.`
        );

        // Get update content of file, in this case is one line
        var updateContent = await readLastLines.read(filePath, 1);

        // emit an event when the file has been updated
        this.emit('file-updated', { message: updateContent });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Observer;
