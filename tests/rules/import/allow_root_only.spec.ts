import { RuleTester } from 'eslint'
import { importLimitation } from '../../../src/rules/import'
import { createJsOption } from '../../utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-allow-root-only-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootOnlyJs/app.js'),
      code: `
      import {test} from './forbid';
    `,
    },
  ],
  invalid: [
    {
      ...createJsOption('./allowRootOnlyJs/app.js'),
      code: `
        import {test} from './forbid/utils';
      `,
      errors: [{ message: createErrorMessage('./forbid/utils') }],
    },
  ],
})
