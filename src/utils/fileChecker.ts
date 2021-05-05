const DEFAULT_IGNORE_PATTERN = '(.spec|.test)(.ts|.tsx|.js)$'
export function ignoreFile(filePath: string): boolean {
  const reg = new RegExp(DEFAULT_IGNORE_PATTERN)

  return reg.test(filePath)
}

