// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import { contextCash, rootComment, RootCommentInfo } from '../cash'
import { extract, parseFilePaths, parseArgStrings } from './lib'
import { TYPES } from '../constants'

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
  const extractedComment = extract(filePath)
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
