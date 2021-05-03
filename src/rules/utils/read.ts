import * as fs from 'fs'
import extract from 'extract-comments'
// @ts-ignore
import {cashComment, CommentInfo} from "./cash";
import {shallowResolve} from "./resolve";

export function readComment(path: string): CommentInfo {
  let commentInfo = cashComment.getComment(path)

  if (!commentInfo) {
    commentInfo = createCommentInfo(path)
    cashComment.setComment(path, commentInfo)
  }

  return commentInfo
}

const PLUGIN_TEXT = '@dependency-relation'
const reg = new RegExp(PLUGIN_TEXT)

/*
   create CommentInfo from filePath
 */
export function createCommentInfo(filePath: string): CommentInfo {
  // read file
  const file = fs.readFileSync(filePath)
  const commentString = file.toString()
  const extractedComment = extract(commentString)

  if (extractedComment.length === 0) {
    return {
      noRestriction: true,
    }
  }

  let needToCheck = false
  let specifiedComment = ''
  for (const _extract of extractedComment) {
    const textedComment = _extract.value
    if (reg.test(textedComment)) {
      needToCheck = true
      specifiedComment = textedComment
      break;
    }
  }

  if (!needToCheck) {
    return {
      noRestriction: true
    }
  }
  const args = specifiedComment.split(':')
  // const options = args[1].replace(/ /g, '')
  const filePaths = parseFilePaths(args[2], filePath)

  return {
    noRestriction: false,
    allowPath: filePaths,
  }
}

/*
  parse string path
    e.g
      arg1: './test.js ./test2.js'
      arg2: 'hoge/fuga/index.js'
      return: ['hoge/fuga/test.js', 'hoge/fuga/test2.js']
 */
export function parseFilePaths(str: string, basePath: string): string[] {
  const results = []
  const strings = str.split(' ')
  for (const _s of strings) {
    if (!_s) continue
    const resolvedPath = shallowResolve(basePath, _s)
    if (!resolvedPath) continue
    results.push(resolvedPath)
  }
  return results
}




