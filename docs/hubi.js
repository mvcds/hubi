//  eslint-disable-next-line
const j = $

function open (details) {
  if (!details || !details.length) return

  details.prop('open', true)
}

j(document).ready(function () {
  var hash = window.location.hash.substr(1).toLowerCase()

  if (!hash.length) return

  if (hash === 'all') return open(j('details'))

  const token = j('[name=' + hash + ']')

  const details = token.is('details') ? token : token.parents('details')

  open(details)
})
