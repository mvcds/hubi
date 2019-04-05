const gw = require('glob-watcher')

function watchForChanges (data, callback) {
  const watcher = gw([data.pattern])

  const watch = waitForEvent(callback)

  watcher.on('change', watch('changed'))
  watcher.on('add', watch('add'))
  watcher.on('unlink', watch('removed'))

  console.log('Watching has been started')
}

function waitForEvent (callback) {
  return (text) => {
    return async (path) => {
      console.log(path, text)

      await callback()
    }
  }
}

module.exports = watchForChanges
