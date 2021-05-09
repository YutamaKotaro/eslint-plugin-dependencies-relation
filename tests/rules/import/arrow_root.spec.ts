import { RuleTester } from 'eslint'
import { importLimitation } from '../../../src/rules/import'
import { createJsOption } from '../../utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-allow-root-path case', importLimitation, {
  valid: [],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './allowRootJs/forbid/utils';
    `,
      errors: [{ message: createErrorMessage('./allowRootJs/forbid/utils') }],
    },
  ],
})
