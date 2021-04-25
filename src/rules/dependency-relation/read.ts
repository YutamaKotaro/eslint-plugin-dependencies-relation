import * as fs from 'fs'
// @ts-ignore
import _extract from 'extract-comments'
import {cashComment, CommentInfo} from "./cash";
import {shallowResolve} from "./resolve";

type Location = {
  line: number,
  column: number,
}
type LineComment = {
  type: 'LineComment',
  value: string,
  range: number[],
  loc: {
    start: Location,
    end: Location,
  },
  raw: string
}
type BlockComment = {
  type: 'BlockComment',
  value: string,
  range: [start: number, end: number],
  codeStart: number,
  raw: string,
  code: Context
}
type Context = {
  context: {
    type: 'declaration'
    name: 'App',
    value: string
    string: string,
    match: string[] // <- have some prototypes
  },
  value: string
  range: [start: number, end: number]
  loc: {
    start: Location
    end: Location
  }
}
type ExtractResult = (LineComment | BlockComment)[]
type Extract = (fileStr: string) => ExtractResult

const extract: Extract = _extract

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


const PLUGIN_TEXT = 'eslint-dependency-relation'
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
    allowOnlyPath: filePaths,
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




