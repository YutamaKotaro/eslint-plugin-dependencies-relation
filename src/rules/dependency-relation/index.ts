import { TSESLint } from "@typescript-eslint/experimental-utils";
import {Rule} from 'eslint'
// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import {readComment} from "./read";
import {contextCash} from "./cash";
import {compare} from "./compare";

type Options = [
  {
    before?: boolean;
    after?: boolean;
    overrides?: Record<
      string,
      {
        before?: boolean;
        after?: boolean;
      }
      >;
  },
];
/*
    specification
    if found import statement
    1. resolve path (get absolutePath) by using eslint-module-utils/resolve
    2. create commentInfo that has information from text comment having "@dependency-relation" prefix
        @Todo: in this time, found specified comment path error (not resolved)
    3. decide whether error exists by comparing context path with imported path
 */
export const dependencyRelation:TSESLint.RuleModule<"dependency-relation", unknown[]> = {
  meta: {
    type: "problem",
    docs: {
      category: "Possible Errors",
      description: "Check JSXText's unnecessary `$` character.",
      recommended: "error",
      url: "",
    },
    messages: {
      "dependency-relation": "Remove unnecessary $ character.",
    },
    schema: [],
    fixable: "code",
  },
  create(context) {
    contextCash.init(context)
    return {
      ImportDeclaration(node) {
        // 1.
        const filePath = node.source.value
        const resolvedPath = resolve(filePath, context)
        if (!resolvedPath) return
        // 2.
        const commentInfo = readComment(resolvedPath)
        // 3.
        const result = compare(commentInfo, context, node)
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

