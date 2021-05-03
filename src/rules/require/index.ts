import { TSESLint } from "@typescript-eslint/experimental-utils";
// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import {readComment, extractRequireStatement, ExtractedRequireStatement} from "../utils/read";
import {contextCash} from "../utils/cash";
import {compare} from "../utils/compare";
import {ignoreFile} from "../utils/fileChecker";

/*
    specification
    if found require statement
    1. resolve path (get absolutePath) by using eslint-module-utils/resolve
    2. create commentInfo that has information from text comment having "@dependency-relation" prefix
        @Todo: in this time, found specified comment path error (not resolved)
    3. decide whether error exists by comparing context path with required path
 */
export const requireLimitation:TSESLint.RuleModule<"require", unknown[]> = {
  meta: {
    type: "problem",
    docs: {
      category: "Possible Errors",
      description: "require relation linting rule for ESLint.",
      recommended: "error",
      url: "",
    },
    messages: {
      require: "Import relation linting rule for ESLint",
    },
    schema: [],
    fixable: "code",
  },
  create(context) {
    contextCash.init(context)
    return {
      VariableDeclaration(node) {
        // 1.
        const requireStatementInfo = extractRequireStatement(node)
        const ignore = ignoreFile(context.getFilename())
        if (ignore || !requireStatementInfo.requireStatement) return

        const resolvedPath = resolve((requireStatementInfo as ExtractedRequireStatement).path, context)
        if (!resolvedPath) return
        // 2.
        const commentInfo = readComment(resolvedPath)
        // 3.
        const result = compare(commentInfo, context, (requireStatementInfo as ExtractedRequireStatement).path, { type: 'require' })
        if (result.existError) {
          context.report({
            node,
            // @ts-ignore
            message: result.error
          })
        }
      }
    }
  }
}

