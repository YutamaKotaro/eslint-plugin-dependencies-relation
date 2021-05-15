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
export function createJsOption(fileName?: string) {
  return createOption(fileName ?? 'base.js')
}
export function createTsOption(fileName?: string) {
  return createOption(fileName ?? 'base.ts')
}
export function createJsxOption(fileName?: string) {
  return createOption(fileName ?? 'base.jsx')
}
export function createTsxOption(fileName?: string) {
  return createOption(fileName ?? 'base.tsx')
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
