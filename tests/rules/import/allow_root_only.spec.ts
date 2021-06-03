import { RuleTester } from 'eslint'
import { importLimitation } from '../../../src/rules/import'
import { createJsOption, createTsOption } from '../../test-utils/test'
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

// @ts-ignore
ruleTester.run('import/js-allow-root-only-pth case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootOnlyJs/app.js'),
      code: `
        import {sample} from './forbid'
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption('./allowRootOnlyJs/app.js'),
      code: `
        import {sample} from './forbid/module/sample'
      `,
      errors: [{ message: createErrorMessage('./forbid/module/sample') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/jsx-allow-root-only-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootOnlyJs/jsx/app.jsx'),
      code: `
      import {test} from './forbid';
    `,
    },
  ],
  invalid: [
    {
      ...createJsOption('./allowRootOnlyJs/jsx/app.jsx'),
      code: `
        import {test} from './forbid/utils';
      `,
      errors: [{ message: createErrorMessage('./forbid/utils') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/ts-allow-root-only-path case', importLimitation, {
  valid: [
    {
      ...createTsOption('./allowRootOnlyTs/app.ts'),
      code: `
        import {test} from './forbid';
      `,
    },
  ],
  invalid: [
    {
      ...createTsOption('./allowRootOnlyTs/app.ts'),
      code: `
        import {test} from './forbid/utils';
      `,
      errors: [{ message: createErrorMessage('./forbid/utils') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/tsx-allow-root-only-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootOnlyTs/tsx/app.tsx'),
      code: `
      import {test} from './forbid';
    `,
    },
  ],
  invalid: [
    {
      ...createJsOption('./allowRootOnlyTs/tsx/app.tsx'),
      code: `
        import {test} from './forbid/utils';
      `,
      errors: [{ message: createErrorMessage('./forbid/utils') }],
    },
  ],
})
