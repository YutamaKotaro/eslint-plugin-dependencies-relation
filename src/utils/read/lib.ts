import extractComments from 'extract-comments'
import { shallowResolve } from '../resolve'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/experimental-utils'
import { T_TYPES } from '../constants'
import fs from 'fs'

const PLUGIN_TEXT = '@dependency-relation'
const reg = new RegExp(PLUGIN_TEXT)
const VUE_REG = /.*(.vue)$/
const VUE_SCRIPT = /<script[\s\S]*?>([\s\S]*?)<\/script>/

export function extract(filePath: string): string | null {
  const file = fs.readFileSync(filePath)
  let source = file.toString()

  // for Vue
  const vueFile = VUE_REG.test(filePath)
  if (vueFile) {
    source = VUE_SCRIPT.exec(source)?.[1] || ''
  }

  const extractedComments = extractComments(source)

  if (extractedComments.length === 0) return null

  let comment = null
  for (const _extract of extractedComments) {
    const text = _extract.value
    if (reg.test(text)) {
      comment = text
      break
    }
  }

  return comment
}

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
  requireStatement: false,
}
/*
  parse string path
    e.g
      arg1: './test.js ./test2.js'
      arg2: 'hoge/fuga/index.js'
      return: ['hoge/fuga/test.js', 'hoge/fuga/test2.js']
 */
export function extractRequireStatement(
  node: TSESTree.VariableDeclaration
): ExtractedRequireStatement | typeof otherStatement {
  const declaration = node.declarations?.[0]
  const type = declaration?.init?.type
  if (!declaration || type !== AST_NODE_TYPES.CallExpression)
    return otherStatement

  const callExpression = declaration.init as TSESTree.CallExpression
  const identifier =
    callExpression.callee.type === AST_NODE_TYPES.Identifier &&
    callExpression.callee
  const isRequireStatement = identifier && identifier.name === 'require'

  if (!isRequireStatement) return otherStatement

  const path =
    callExpression.arguments?.[0].type === AST_NODE_TYPES.Literal
      ? `${callExpression.arguments?.[0].value}`
      : ''

  return {
    requireStatement: true,
    path,
  }
}

export function parseArgStrings(argString: string) {
  const args = argString.split(':')
  const fileStrings = args[2]
  const option = args[1].replace(/ /g, '') as T_TYPES

  return {
    fileStrings,
    option,
  }
}
