function urlSplit(url) {
  const firstQuestionMark = url.indexOf('?')
  if (firstQuestionMark === -1) {
    return
  } else {
    let paramsUrl = url.substring(firstQuestionMark + 1)
    let params = {}
    while (paramsUrl.indexOf('=') !== -1) {
      const firstPosition = paramsUrl.indexOf('=')
      const secondPosition = paramsUrl.indexOf('&')
      if (secondPosition === -1) {
        params[paramsUrl.substring(0, firstPosition)] = paramsUrl.substring(firstPosition + 1)
        break
      }
      params[paramsUrl.substring(0, firstPosition)] = paramsUrl.substring(firstPosition + 1, secondPosition)
      paramsUrl = paramsUrl.substring(secondPosition + 1)
    }
    return params
  }
}

module.exports = urlSplit