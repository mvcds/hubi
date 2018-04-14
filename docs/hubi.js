//  eslint-disable-next-line
const j = $

function open (detail) {
  detail.prop('open', true)
}

j(document).ready(function () {
  var hash = window.location.hash.substr(1)

  if (!hash.length) return

  if (hash === 'all') return open(j('details'))

  const token = j('[name=' + hash + ']')

  if (!token) return

  open(j(token))
})
