import * as path from 'path'

export function getFilePath(relativePath: string) {
  return path.join(process.cwd(), './tests/files', relativePath)
}

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue']
export function createOption(baseFile: string, options?: any) {
  const filename = getFilePath(baseFile)
  const settings = {
    'import/resolver': {
      node: {
        extensions,
      },
    },
  }

  return {
    filename,
    parser: require.resolve('@typescript-eslint/parser'),
    settings,
    ...(options || {}),
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
export function createVueOption(fileName?: string) {
  return createOption(fileName || 'base.vue', {
    parserOptions: {
      parser: require.resolve('@typescript-eslint/parser'),
      extraFileExtensions: extensions,
      ecmaFeatures: {
        jsx: true,
      },
    },
    parser: require.resolve('vue-eslint-parser'),
  })
}
