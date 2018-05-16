function requiredArgs (number) {
  return Array(number).fill({ required: true })
}

function optionalArgs (number) {
  return Array(number).fill({ required: false })
}

function withArguments ({ required, optional }) {
  const args = {
    required: requiredArgs(required),
    optional: optionalArgs(optional)
  }

  const data = args.required.concat(args.optional)

  return {
    kind: 'args',
    data
  }
}

module.exports = {
  withArguments
}
