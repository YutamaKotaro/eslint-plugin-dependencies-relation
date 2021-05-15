// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import { contextCash, rootComment, RootCommentInfo } from '../cash'
import { extract, parseFilePaths, parseArgStrings } from './lib'
import { TYPES } from '../constants'

export function readRootCommentInfo(filePath: string): RootCommentInfo {
  const indexFilePath = getIndexFilePath(filePath)
  if (!indexFilePath) {
    return {
      rootFilePath: '',
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

export function createRootCommentInfo(rootFilePath: string): RootCommentInfo {
  const extractedComment = extract(rootFilePath)
  if (!extractedComment) {
    return {
      rootFilePath,
      noRestriction: true,
      type: TYPES.NONE,
    }
  }
  const { fileStrings, option } = parseArgStrings(extractedComment)
  const filePaths = parseFilePaths(fileStrings, rootFilePath)
  return {
    rootFilePath,
    type: option,
    noRestriction: false,
    filePath: filePaths,
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
