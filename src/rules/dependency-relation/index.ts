import { TSESLint } from "@typescript-eslint/experimental-utils";
// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import {readComment} from "./read";
import {contextCash} from "./cash";
import {compare} from "./compare";


/*
    specification
    1. get commentInfo
      - if the file Base file try to read has limitation, noRestriction = true
        - in this case, commentInfo have allowPath which means specified filePath is ok to read me other else not.
      - if not, notRestriction = false.

 */

export const dependencyRelation:TSESLint.RuleModule<"removeDollar", []> = {
  meta: {
    type: "problem",
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
        console.log('1')
        const filePath = node.source.value
        console.log('2', filePath)
        const resolvedPath = resolve(filePath, context)

        if (!resolvedPath) return
        console.log('33', resolvedPath)
        const commentInfo = readComment(resolvedPath)
        console.log(commentInfo)
        const hasError = compare(commentInfo)
        if (hasError) {
          console.log('error reported')
          context.report({
            node,
            // @ts-ignore
            message: 'それはあかんじゃろがい！'
          })
        }
      }
    }
  }
}

