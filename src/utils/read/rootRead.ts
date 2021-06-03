// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import { contextCash, rootComment, RootCommentInfo } from '../cash'
import { extract, parseFilePaths, parseArgStrings } from './lib'
import { TYPES } from '../constants'

export function readRootCommentInfoList(filePath: string): RootCommentInfo[] {
  const baseFile = contextCash.get().getFilename()
  const pathList = filePath.split('/')
  const result: RootCommentInfo[] = [readRootCommentInfo(filePath)]
  pathList.pop()
  for (let i = 0, l = pathList.length; i < l; i++) {
    const childRoot = pathList.join('/')
    if (childRoot === baseFile) {
      break
    }
    const _result = readRootCommentInfo(childRoot)
    result.push(_result)
    pathList.pop()
    if (_result.type === TYPES.ALLOW_ONLY_ROOT) break
  }

  return result
}

export function readRootCommentInfo(filePath: string): RootCommentInfo {
  const indexFilePath = getIndexFilePath(filePath)
  if (!indexFilePath) {
    return {
      filePath: '',
      noRestriction: true,
      type: TYPES.NONE,
    }
  }
  let rootCommentInfo = rootComment.getComment(indexFilePath)

  if (!rootCommentInfo) {
    rootCommentInfo = createRootCommentInfo(indexFilePath)
    rootComment.setComment(indexFilePath, rootCommentInfo)
  }

  return rootCommentInfo
}

export function createRootCommentInfo(filePath: string): RootCommentInfo {
  let extractedComment
  try {
    extractedComment = extract(filePath)
  } catch (_) {
    extractedComment = null
  }
  if (!extractedComment) {
    return {
      filePath,
      noRestriction: true,
      type: TYPES.NONE,
    }
  }
  const { fileStrings, option } = parseArgStrings(extractedComment)
  const filePaths = parseFilePaths(fileStrings, filePath)
  return {
    filePath,
    type: option,
    noRestriction: false,
    allowPath: filePaths,
  }
}

export function getIndexFilePath(filePath: string): string {
  const context = contextCash.get()
  const _dirName = filePath.split('/')
  _dirName.pop()
  const dirName = _dirName.join('/')
  const indexFilePath = resolve(dirName, context)

  return indexFilePath
}
