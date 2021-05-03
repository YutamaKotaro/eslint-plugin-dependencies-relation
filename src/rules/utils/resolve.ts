import {resolve} from 'path'

export function shallowResolve(fromPath: string, toPath: string) {
  const fromPaths = fromPath.split('/')
  fromPaths.pop()
  const from = fromPaths.join('/')
  return resolve(from, toPath)
}
