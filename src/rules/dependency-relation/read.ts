import * as fs from 'fs'
import extract, { ExtractResult} from 'extract-comments'
import {cashComment, CommentInfo} from "./cash";
import {shallowResolve} from "./resolve";

export function readComment(path: string) {
  let commentInfo = cashComment.getComment(path)
  if (!commentInfo) {
    const file = fs.readFileSync(path)
    const commentString = file.toString()
    commentInfo = parseTextToComment(extract(commentString), path)
    cashComment.setComment(path, commentInfo)
  }

  return commentInfo
}

const PLUGIN_TEXT = '@dependency-relation'
const reg = new RegExp(PLUGIN_TEXT)
function parseTextToComment(comment: ExtractResult, fromFilePath: string): CommentInfo {
  const commentText = comment[0].value
  const needToCheck = reg.test(commentText)
  if (!needToCheck) {
    return {
      noRestriction: true
    }
  }
  const args = commentText.split(':')
  const options = args[1].replace(/ /g, '')
  const filePaths = parseFilePaths(args[2], fromFilePath)

  return {
    noRestriction: false,
    allowPath: filePaths,
  }
}

function parseFilePaths(str: string, fromFilePath: string) {
  const results = []
  const strings = str.split(' ')
  for (const _s of strings) {
    if (!_s) continue
    const resolvedPath = shallowResolve(fromFilePath, _s)
    if (!resolvedPath) continue
    results.push(resolvedPath)
  }
  return results
}




