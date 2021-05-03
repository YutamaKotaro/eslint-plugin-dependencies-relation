import * as path from 'path'
import {create} from "domain";


export function getFilePath(relativePath: string) {
  return path.join(process.cwd(), './tests/files', relativePath);
}

const extensions = ['.ts', '.tsx', '.js', '.jsx']
export function createOption(baseFile: string) {
  const filename = getFilePath(baseFile)
  const parserOptions = {
    sourceType: 'module',
    ecmaVersion: 11,
  }
  const settings = {
    'import/resolver': {
      'node': {
        extensions,
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
