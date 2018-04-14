const { log } = console

function LogConditionally ({ canLog, print = log }) {
  LogConditionally.canLog = canLog
  LogConditionally.print = print
}

LogConditionally.log = function (message) {
  if (!LogConditionally.canLog) return

  LogConditionally.print(message)
}

module.exports = LogConditionally
