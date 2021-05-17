import { RuleTester } from 'eslint'
import { importLimitation } from '../../../src/rules/import'
import {
  createJsOption,
  createTsOption,
  createJsxOption,
  createTsxOption,
  createOption,
  createVueOption,
} from '../../test-utils/test'
import { createErrorMessage } from '../../../src/utils/compare'

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-simple-path case', importLimitation, {
  valid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './js/app';
     `,
    },
    {
      ...createJsOption(),
      code: `
      import {test} from './js/allow';
    `,
    },
  ],
  invalid: [
    {
      ...createJsOption(),
      code: `
      import {test} from './js/forbid';
    `,
      errors: [{ message: createErrorMessage('./js/forbid') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/jsx-simple-path case', importLimitation, {
  valid: [
    {
      ...createJsxOption(),
      code: `
      import {test} from './js/jsx/app';
     `,
    },
    {
      ...createJsxOption(),
      code: `
      import {test} from './js/jsx/allow';
    `,
    },
  ],
  invalid: [
    {
      ...createJsxOption(),
      code: `
      import {test} from './js/jsx/forbid';
    `,
      errors: [{ message: createErrorMessage('./js/jsx/forbid') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/ts-simple-path case', importLimitation, {
  valid: [
    {
      ...createTsOption(),
      code: `
      import {test} from './ts/app';
     `,
    },
    {
      ...createTsOption(),
      code: `
      import {test} from './ts/allow';
     `,
    },
  ],
  invalid: [
    {
      ...createTsOption(),
      code: `
      import {test} from './ts/forbid';
    `,
      errors: [{ message: createErrorMessage('./ts/forbid') }],
    },
  ],
})

// @ts-ignore
ruleTester.run('import/tsx-simple-path case', importLimitation, {
  valid: [
    {
      ...createTsxOption(),
      code: `
      import {test} from './ts/tsx/app';
     `,
    },
    {
      ...createTsxOption(),
      code: `
      import {test} from './ts/tsx/allow';
     `,
    },
  ],
  invalid: [
    {
      ...createTsxOption(),
      code: `
      import {test} from './ts/tsx/forbid';
    `,
      errors: [{ message: createErrorMessage('./ts/tsx/forbid') }],
    },
  ],
})

ruleTester.run(
  'import/*.(test|spec)(.js|.ts) ignore patterning',
  // @ts-ignore
  importLimitation,
  {
    valid: [
      {
        ...createOption('a.test.js'),
        code: `
      import {test} from './js/forbid';
    `,
      },
      {
        ...createOption('a.spec.js'),
        code: `
      import {test} from './js/forbid';
    `,
      },
      {
        ...createOption('a.test.ts'),
        code: `
      import {test} from './ts/forbid';
    `,
      },
      {
        ...createOption('a.spec.ts'),
        code: `
      import {test} from './ts/forbid';
    `,
      },
    ],
    invalid: [],
  }
)

// @ts-ignore
ruleTester.run('import/vue-simple-path', importLimitation, {
  valid: [
    {
      ...createVueOption(),
      code: `
      <template><div>base</div></template>
      <script>
        import Test from './vue/app.vue'
      </script>
    `,
    },
    {
      ...createVueOption(),
      code: `
          <template><div>base</div></template>
      <script>
        import Test from './vue/allow.vue'
      </script>
    `,
    },
  ],
  invalid: [
    {
      ...createVueOption(),
      code: `
      <template><div>base</div></template>
      <script>
        import Test from './vue/forbid.vue'
      </script>
    `,
      errors: [{ message: createErrorMessage('./vue/forbid.vue') }],
    },
  ],
})
