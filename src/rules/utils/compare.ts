import {TSESTree } from "@typescript-eslint/experimental-utils";
import {CommentInfo} from "./cash";

type SafeResult = {
  existError: false
}
type ErrorResult = {
  existError: true
  error: string
}

export function compare(commentInfo: CommentInfo, context: any, node: TSESTree.ImportDeclaration): SafeResult | ErrorResult {
  const {
    allowPath,
    noRestriction
  } = commentInfo
  if (!allowPath || noRestriction) {
    return {
      existError: false
    }
  }

  const baseFile: string = context.getFilename()
  for (const _alloOnlypath of allowPath) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}*`)
    if (!reg.test(baseFile)) {
      const sourceCode = context.getSourceCode()
      const error = createErrorMessage(sourceCode.getText(node.source))

      return {
        existError: true,
        error,
      }
    }
  }

  return {
    existError: false
  }
}

export function createErrorMessage(path: string): string {
  return `import path ${path} is not allowed from this file`
}
