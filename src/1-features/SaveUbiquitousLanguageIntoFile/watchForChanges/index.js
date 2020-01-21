const LogConditionally = require('hubi-domain/Services/LogConditionally')

function watchForChanges (data, callback, gw) {
  const watcher = gw([data.pattern])

  const watch = waitForEvent(callback)

  watcher.on('change', watch('changed'))
  watcher.on('add', watch('add'))
  watcher.on('unlink', watch('removed'))

  LogConditionally.env('Watching has been started', 'PRODUCTION')
}

function waitForEvent (callback) {
  return (text) => {
    return async (path) => {
      LogConditionally.env(`${path} ${text}`, 'PRODUCTION')

      await callback()
    }
  }
}

module.exports = watchForChanges
