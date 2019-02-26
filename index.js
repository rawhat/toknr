const numRegex = /^([0-9]+)/
const strRegex = /^([A-z]+)/

function getTokens(str) {
  const tokens = []
  let rest = str

  while (rest) {
    let match = rest.match(numRegex)
    if (match) {
      tokens.push(parseInt(match[0]))
      rest = rest.replace(numRegex, "")
      continue
    }
    match = rest.match(strRegex)
    if (match) {
      tokens.push(match[0])
      rest = rest.replace(strRegex, "")
      continue
    }
    rest = rest.substring(1)
  }

  return tokens
}

function zip(a, b) {
  const size = Math.max(a.length, b.length)
  const zipped = []
  for (let i = 0; i < size; i++) {
    zipped.push([a[i], b[i]])
  }
  return zipped
}

function sortByTokens(strings, ignoreCase=false) {
  return [...strings.sort((a, b) => {
    const aTokens = getTokens(a)
    const bTokens = getTokens(b)

    for (const [aToken, bToken] of zip(aTokens, bTokens)) {
      if (!aToken && bToken) {
        return -1
      } else if (aToken && !bToken) {
        return 1
      }
      if (
        (!ignoreCase && aToken === bToken) ||
        ((typeof aToken === 'string' && typeof bToken === 'string')
        && aToken.toLowerCase() === bToken.toLowerCase())
      ){
        continue
      }

      const aIsNumber = typeof aToken === 'number'
      const bIsNumber = typeof bToken === 'number'

      if (aIsNumber && !bIsNumber) {
        return -1
      } else if (!aIsNumber && bIsNumber) {
        return 1
      }

      return aToken < bToken ? -1 : 1
    }
  })]
}

module.exports = {
  sortByTokens,
}
