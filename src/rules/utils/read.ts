import * as fs from 'fs'
import extract from 'extract-comments'
import {TSESTree, AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";

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

export type ExtractedRequireStatement = {
  requireStatement: true
  path: string
}
const otherStatement = {
  requireStatement: false
}
export function extractRequireStatement(node: TSESTree.VariableDeclaration): ExtractedRequireStatement | typeof otherStatement {
  const declaration = node.declarations?.[0]
  const type = declaration?.init?.type
  if (!declaration || type !== AST_NODE_TYPES.CallExpression) return otherStatement

  const callExpression = declaration.init as TSESTree.CallExpression
  const identifier = callExpression.callee.type === AST_NODE_TYPES.Identifier && callExpression.callee
  const isRequireStatement = identifier && identifier.name === 'require'

  if (!isRequireStatement) return otherStatement

  const path = callExpression.arguments?.[0].type === AST_NODE_TYPES.Literal ? `${callExpression.arguments?.[0].value}` : ''

  return {
    requireStatement: true,
    path,
  }
}

