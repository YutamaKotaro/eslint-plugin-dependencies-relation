import {CommentInfo} from "./cash";

type SafeResult = {
  existError: false
}
type ErrorResult = {
  existError: true
  error: string
}

export function compare(
  commentInfo: CommentInfo,
  /* eslint @typescript-eslint/no-explicit-any: 0, @typescript-eslint/explicit-module-boundary-types:0 */
  context: any,
  reportFilePath: string,
  option: {
    type: 'import' | 'require'
  }
): SafeResult | ErrorResult {
  const {
    allowPath,
    noRestriction
  } = commentInfo
  if (!allowPath || noRestriction) {
    return {
      existError: false
    }
  }

  const baseFile: string = context.getFilename()
  for (const _alloOnlypath of allowPath) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}*`)
    if (!reg.test(baseFile)) {
      const error = createErrorMessage(reportFilePath, option.type)

      return {
        existError: true,
        error,
      }
    }
  }

  return {
    existError: false
  }
}

export function createErrorMessage(path: string, type: 'import' | 'require' = 'import'): string {
  return `${type} path ${path} is not allowed from this file`
}
