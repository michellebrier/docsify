import { cached } from '../util/core'

const decode = decodeURIComponent
const encode = encodeURIComponent

export function parseQuery (query) {
  const res = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  // Simple parse
  query.split('&').forEach(function (param) {
    const parts = param.replace(/\+/g, ' ').split('=')

    res[parts[0]] = decode(parts[1])
  })
  return res
}

export function stringifyQuery (obj) {
  const qs = []

  for (const key in obj) {
    qs.push(`${encode(key)}=${encode(obj[key])}`.toLowerCase())
  }

  return qs.length ? `?${qs.join('&')}` : ''
}

export function getPath (...args) {
  return cleanPath(args.join('/'))
}

export const isAbsolutePath = cached(path => {
  return /(:|(\/{2}))/g.test(path)
})

export const getParentPath = cached(path => {
  return /\/$/g.test(path)
    ? path
    : (path = path.match(/(\S*\/)[^\/]+$/))
      ? path[1]
      : ''
})

export const cleanPath = cached(path => {
  return path
    .replace(/^\/+/, '/')
    .replace(/([^:])\/{2,}/g, '$1/')
})
