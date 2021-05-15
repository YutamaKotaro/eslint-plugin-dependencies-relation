import { RuleTester } from 'eslint'
import { requireLimitation } from '../../../src/rules/require'
import { createJsOption } from '../../utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-allow-root-path case', requireLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootJs/require/app.js'),
      code: `
          const {test} = require('./forbid/utils')
      `,
    },
    {
      ...createJsOption('./allowRootJs/require/app.js'),
      code: `
        const {test} = require('./forbid')
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
        const {test} = require('./allowRootJs/require/forbid')
      `,
      errors: [
        {
          message: createErrorMessage(
            './allowRootJs/require/forbid',
            'require'
          ),
        },
      ],
    },
    {
      ...createJsOption(),
      code: `
        const {test} = require('./allowRootJs/require/forbid/utils')
      `,
      errors: [
        {
          message: createErrorMessage(
            './allowRootJs/require/forbid/utils',
            'require'
          ),
        },
      ],
    },
  ],
})
