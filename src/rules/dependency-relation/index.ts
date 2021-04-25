import { TSESLint } from "@typescript-eslint/experimental-utils";
// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import * as fs from 'fs'
// @ts-ignore
import extract from 'extract-comments'
import {readComment} from "./read";
import {receiveMessageOnPort} from "worker_threads";
import {contextCash} from "./cash";
import {compare} from "./compare";

export const dependencyRelation:TSESLint.RuleModule<"removeDollar", []> = {
  meta: {
    type: "suggestion",
    docs: {
      category: "Possible Errors",
      description: "Check JSXText's unnecessary `$` character.",
      recommended: "error",
      url: "",
    },
    messages: {
      removeDollar: "Remove unnecessary $ character.",
    },
    schema: [],
    fixable: "code",
  },
  create(context) {
    contextCash.init(context)
    return {
      ImportDeclaration(node) {
        const filePath = node.source.value
        const resolvedPath = resolve(filePath, context)
        const commentInfo = readComment(resolvedPath)
        const result = compare(commentInfo)
        console.log(result)
        if (result) {
          context.report({
            node,
            message: 'それはあかんじゃろがい！'
          })
        }
        // const sourceCode = context.getSourceCode()
        // const comment = extract(file.toString())
        // console.log(comment)
        // console.log(sourceCode.getText(node))
        // const filePath = `${dirName}/${node.source.value}`
      }
    }
  }
}

