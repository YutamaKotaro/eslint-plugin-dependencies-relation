import { TSESLint } from '@typescript-eslint/experimental-utils'
// @ts-ignore
import resolve from 'eslint-module-utils/resolve'
import { readRootCommentInfo, readComment } from '../../utils/read'
import { contextCash } from '../../utils/cash'
import { compare } from '../../utils/compare'
import { ignoreFile } from '../../utils/fileChecker'
import { STATEMENT_TYPES } from '../../utils/constants'

/*
    specification
    if found import statement
    1. resolve path (get absolutePath) by using eslint-module-utils/resolve
    2. create commentInfo that has information from text comment having "@dependency-relation" prefix
        @Todo: in this time, found specified comment path error (not resolved)
       2.1 see if there is index file in same directory.If doesn't exists, create parent comments.
    3. decide whether error exists by comparing context path with imported path
 */
export const importLimitation: TSESLint.RuleModule<'import', unknown[]> = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Possible Errors',
      description: 'Import relation linting rule for ESLint.',
      recommended: 'error',
      url: '',
    },
    messages: {
      import: 'Import relation linting rule for ESLint',
    },
    schema: [],
    fixable: 'code',
  },
  create(context) {
    contextCash.init(context)
    return {
      ImportDeclaration(node) {
        // 1.
        const filePath = node.source.value
        const ignore = ignoreFile(context.getFilename())
        if (ignore) return
        const resolvedPath = resolve(filePath, context)
        if (!resolvedPath || /.*\/node_modules\/.*/.test(resolvedPath)) return
        // 2.
        const rootCommentInfo = readRootCommentInfo(resolvedPath)
        const commentInfo = readComment(resolvedPath)
        // 3.
        const result = compare(
          commentInfo,
          rootCommentInfo,
          context,
          `${filePath}`,
          {
            type: STATEMENT_TYPES.IMPORT,
          }
        )
        if (result.existError) {
          context.report({
            node,
            // @ts-ignore
            message: result.error,
          })
        }
      },
    }
  },
}
