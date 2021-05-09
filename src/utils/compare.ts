import { CommentInfo, RootCommentInfo } from './cash'
import { STATEMENT_TYPES, T_STATEMENT_TYPES, TYPES } from './constants'
import { create } from 'domain'

type SafeResult = {
  existError: false
}
type ErrorResult = {
  existError: true
  error: string
}

export function compare(
  commentInfo: CommentInfo,
  rootCommentInfo: RootCommentInfo,
  /* eslint @typescript-eslint/no-explicit-any: 0, @typescript-eslint/explicit-module-boundary-types:0 */
  context: any,
  reportFilePath: string,
  option: {
    type: T_STATEMENT_TYPES
  }
): SafeResult | ErrorResult {
  const { allowPath, noRestriction } = commentInfo
  const {
    noRestriction: noRestrictionRoot,
    filePath: filePathRoot,
  } = rootCommentInfo

  if ((!allowPath || noRestriction) && (!filePathRoot || noRestrictionRoot)) {
    return {
      existError: false,
    }
  }
  const baseFile: string = context.getFilename()
  const allowFilePaths = createAllowFilePath(commentInfo, rootCommentInfo)

  for (const _alloOnlypath of allowFilePaths) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}.*`)
    if (!reg.test(baseFile)) {
      const error = createErrorMessage(reportFilePath, option.type)

      return {
        existError: true,
        error,
      }
    }
  }

  return {
    existError: false,
  }
}

export function createErrorMessage(
  path: string,
  type: T_STATEMENT_TYPES = STATEMENT_TYPES.IMPORT
): string {
  return `${type} path ${path} is not allowed from this file`
}

export function createAllowFilePath(
  commentInfo: CommentInfo,
  rootCommentInfo: RootCommentInfo
) {
  const paths = commentInfo.allowPath || []
  const rootPaths = rootCommentInfo.filePath || []
  const { type } = rootCommentInfo

  switch (type) {
    case TYPES.ALLOW_ROOT: {
      return [...paths, ...rootPaths]
    }
    default:
      return paths
  }
}
