import {RuleTester} from 'eslint'
import {dependencyRelation} from "../../../src/rules/import";
import {createJsOption, createTsOption, createJsxOption, createTsxOption, createOption} from "../../utils/test";
import {createErrorMessage} from "../../../src/rules/utils/compare";

const ruleTester = new RuleTester()

// @ts-ignore
ruleTester.run('import/js-simple-path case', dependencyRelation, {
  valid: [{
    ...createJsOption(),
    code: `
      import {test} from './js/app';
     `,
  }],
  invalid: [{
    ...createJsOption(),
    code: `
      import {test} from './js/forbid';
    `,
    errors: [{ message: createErrorMessage("'./js/forbid'") }]
  }]
})

// @ts-ignore
ruleTester.run('import/jsx-simple-path case', dependencyRelation, {
  valid: [{
    ...createJsxOption(),
    code: `
      import {test} from './js/jsx/app';
     `,
  }],
  invalid: [{
    ...createJsxOption(),
    code: `
      import {test} from './js/jsx/forbid';
    `,
    errors: [{ message: createErrorMessage("'./js/jsx/forbid'") }]
  }]
})


// @ts-ignore
ruleTester.run('import/ts-simple-path case', dependencyRelation, {
  valid: [{
    ...createTsOption(),
    code: `
      import {test} from './ts/app';
     `,
  }],
  invalid: [{
    ...createTsOption(),
    code: `
      import {test} from './ts/forbid';
    `,
    errors: [{ message: createErrorMessage("'./ts/forbid'") }]
  }]
})

// @ts-ignore
ruleTester.run('import/tsx-simple-path case', dependencyRelation, {
  valid: [{
    ...createTsxOption(),
    code: `
      import {test} from './ts/tsx/app';
     `,
  }],
  invalid: [{
    ...createTsxOption(),
    code: `
      import {test} from './ts/tsx/forbid';
    `,
    errors: [{ message: createErrorMessage("'./ts/tsx/forbid'") }]
  }]
})

// @ts-ignore
ruleTester.run('import/*.test.js|ts ignore patterning',dependencyRelation, {
  valid: [{
    ...createOption('a.test.js'),
    code: `
      import {test} from './js/forbid';
    `
  },{
    ...createOption('a.spec.js'),
    code: `
      import {test} from './js/forbid';
    `
  }, {
    ...createOption('a.test.ts'),
    code: `
      import {test} from './ts/forbid';
    `
  },
    {
      ...createOption('a.spec.ts'),
      code: `
      import {test} from './ts/forbid';
    `
    }],
  invalid: []
})

