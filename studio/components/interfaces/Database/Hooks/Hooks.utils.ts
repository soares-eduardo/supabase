// Converts a list of single object, into a single object
// e.g [{ name: 'name1', value: 'value1' }, { name: 'name2', value: 'value2' }]
//  -> { name1: 'value1', name2: 'value2' }
export const formatArguments = (args: { name: string; value: string }[]) => {
  const res: any = {}
  args.forEach((args) => {
    res[args.name] = args.value
  })
  return JSON.stringify(res)
}

/**
 * convert "{\"Content-type\":\"application/json\"}"
 * to {value: [{name: 'search_path', value: 'auth, public'}]}
 */

export const convertKeyValue = (value: string) => {
  const temp = []
  if (value) {
    const obj = JSON.parse(value)
    for (let key in obj) {
      temp.push({ name: key, value: obj[key] })
    }
  }
  return { value: temp }
}

export const hasWhitespace = (value: string) => {
  return /\s/.test(value)
}

export const isValidHttpUrl = (value: string) => {
  let url: URL
  try {
    url = new URL(value)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
