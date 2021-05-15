import { RuleTester } from 'eslint'
import { requireLimitation } from '../../../src/rules/require'
import { createJsOption, createTsOption } from '../../utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('require/js-allow-root-only-path case', requireLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootOnlyJs/require/app.js'),
      code: `
        const {test} = require('./forbid')
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption('./allowRootOnlyJs/require/app.js'),
      code: `
      const {test} = require('./forbid/utils');
    `,
      errors: [{ message: createErrorMessage('./forbid/utils', 'require') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('require/ts-allow-root-only-path case', requireLimitation, {
  valid: [
    {
      ...createTsOption('./allowRootOnlyTs/require/app.ts'),
      code: `
        const {test} = require('./forbid');
      `,
    },
  ],
  invalid: [
    {
      ...createTsOption('./allowRootOnlyTs/require/app.ts'),
      code: `
        const {test} = require('./forbid/utils')
      `,
      errors: [{ message: createErrorMessage('./forbid/utils', 'require') }],
    },
  ],
})
