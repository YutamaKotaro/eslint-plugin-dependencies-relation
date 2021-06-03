import { CommentInfo, RootCommentInfo, contextCash } from './cash'
import { STATEMENT_TYPES, T_STATEMENT_TYPES, TYPES } from './constants'

type SafeResult = {
  existError: false
}
type ErrorResult = {
  existError: true
  error: string
}

export function compareList(
  commentInfo: CommentInfo,
  rootCommentInfoList: RootCommentInfo[],
  filePath: string,
  option: {
    type: T_STATEMENT_TYPES
  }
): SafeResult | ErrorResult {
  let result: SafeResult | ErrorResult = { existError: false }
  const context = contextCash.get()
  for (const _el of rootCommentInfoList) {
    result = compare(commentInfo, _el, context, filePath, option)
    if (result.existError) break
  }

  return result
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
    if (reg.test(baseFile)) {
      return {
        existError: false,
      }
    }
  }
  if (allowFilePaths.length > 0) {
    const error = createErrorMessage(reportFilePath, option.type)

    return {
      existError: true,
      error,
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

export function createAllowFilePathRoot(
  commentInfo: CommentInfo,
  rootCommentInfo: RootCommentInfo[]
) {
  let result: string[] = []
  for (const rootInfo of rootCommentInfo) {
    const _result = createAllowFilePath(commentInfo, rootInfo)
    result = merge(result, _result)
    if (rootInfo?.type === TYPES.ALLOW_ONLY_ROOT) {
      break
    }
  }
  return result
}

export function createAllowFilePath(
  commentInfo: CommentInfo,
  rootCommentInfo: RootCommentInfo
) {
  const paths = commentInfo.allowPath || []
  const rootPaths = rootCommentInfo.allowPath || []
  const { type } = rootCommentInfo
  switch (type) {
    case TYPES.ALLOW_ONLY_ROOT: {
      if (rootCommentInfo.filePath === commentInfo.filePath) {
        return merge(rootPaths, paths)
      }
      return [rootCommentInfo.filePath]
    }
    case TYPES.ALLOW_ROOT: {
      return merge(paths, rootPaths)
    }
    default:
      return paths
  }
}

export function merge(a: string[], b: string[]) {
  const res = [...a]
  for (const elem of b) {
    if (!res.includes(elem)) res.push(elem)
  }

  return res
}
