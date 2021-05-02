import * as path from 'path'
import {create} from "domain";


export function getFilePath(relativePath: string) {
  return path.join(process.cwd(), './tests/files', relativePath);
}

export function createOption(baseFile: string) {
  const filename = getFilePath(baseFile)
  const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 11,
  }
  const settings = {
    'import/resolver': {
      'node': {
        'extensions': ['.ts', '.tsx', '.js', '.jsx']
      }
    }
  }

  return {
    filename,
    parserOptions,
    settings,
  }
}
export function createJsOption() {
  return createOption('base.js')
}
export function createTsOption() {
  return createOption('base.ts')
}
export function createJsxOption() {
  return createOption('base.jsx')
}
export function createTsxOption() {
  return createOption('base.tsx')
}
