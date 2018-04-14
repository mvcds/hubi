//  eslint-disable-next-line
const j = $

j(document).ready(function () {
  var hash = window.location.hash.substr(1)

  if (!hash.length) return

  const token = j('[name=' + hash + ']')

  if (!token) return

  j(token).prop('open', true)
})
