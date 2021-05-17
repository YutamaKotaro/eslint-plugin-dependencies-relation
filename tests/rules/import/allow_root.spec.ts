import { RuleTester } from 'eslint'
import { importLimitation } from '../../../src/rules/import'
import { createJsOption, createVueOption } from '../../test-utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-allow-root-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootJs/app.js'),
      code: `
      import {test} from './forbid/utils';
    `,
    },
    {
      ...createJsOption('./allowRootJs/app.js'),
      code: `
            import {test} from './forbid';
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './allowRootJs/forbid/utils';
    `,
      errors: [{ message: createErrorMessage('./allowRootJs/forbid/utils') }],
    },
    {
      ...createJsOption(),
      code: `
            import {test} from './allowRootJs/forbid';
      `,
      errors: [{ message: createErrorMessage('./allowRootJs/forbid') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/jsx-allow-root-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootJs/jsx/app.jsx'),
      code: `
      import {test} from './forbid/utils';
    `,
    },
    {
      ...createJsOption('./allowRootJs/jsx/app.jsx'),
      code: `
            import {test} from './forbid';
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './allowRootJs/jsx/forbid/utils';
    `,
      errors: [
        { message: createErrorMessage('./allowRootJs/jsx/forbid/utils') },
      ],
    },
    {
      ...createJsOption(),
      code: `
            import {test} from './allowRootJs/jsx/forbid/utils';
      `,
      errors: [
        { message: createErrorMessage('./allowRootJs/jsx/forbid/utils') },
      ],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/ts-allow-root-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootTs/app.ts'),
      code: `
      import {test} from './forbid/utils';
    `,
    },
    {
      ...createJsOption('./allowRootTs/app.ts'),
      code: `
            import {test} from './forbid';
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './allowRootTs/forbid/utils';
    `,
      errors: [{ message: createErrorMessage('./allowRootTs/forbid/utils') }],
    },
    {
      ...createJsOption(),
      code: `
            import {test} from './allowRootTs/forbid';
      `,
      errors: [{ message: createErrorMessage('./allowRootTs/forbid') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/tsx-allow-root-path case', importLimitation, {
  valid: [
    {
      ...createJsOption('./allowRootTs/tsx/app.tsx'),
      code: `
      import {test} from './forbid/utils';
    `,
    },
    {
      ...createJsOption('./allowRootTs/tsx/app.tsx'),
      code: `
            import {test} from './forbid';
      `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './allowRootTs/tsx/forbid/utils';
    `,
      errors: [
        { message: createErrorMessage('./allowRootTs/tsx/forbid/utils') },
      ],
    },
    {
      ...createJsOption(),
      code: `
            import {test} from './allowRootTs/tsx/forbid/utils';
      `,
      errors: [
        { message: createErrorMessage('./allowRootTs/tsx/forbid/utils') },
      ],
    },
  ],
})
