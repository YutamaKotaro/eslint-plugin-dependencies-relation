import {RuleTester} from "eslint";
import {requireLimitation} from "../../../src/rules/require";
import {createJsOption, createOption, createTsOption} from "../../utils/test";
import {createErrorMessage} from "../../../src/rules/utils/compare";
import {importLimitation} from "../../../src/rules/import";

const ruleTester = new RuleTester()


// @ts-ignore
ruleTester.run('require/js-simple-path case', requireLimitation, {
  valid: [{
    ...createJsOption(),
    code: `
      const { test } = require('./js/require/app');
    `
  }],
  invalid: [{
    ...createJsOption(),
    code: `
      const {test} = require('./js/require/forbid');
    `,
    errors: [{ message: createErrorMessage('./js/require/forbid')}]
  }]
})

// @ts-ignore
ruleTester.run('require/ts-simple-path case', requireLimitation, {
  valid: [{
    ...createTsOption(),
    code: `
      const {test} = require('./ts/require/app');
    `
  }],
  invalid: [{
    ...createTsOption(),
    code: `
      const {test} = require('./ts/require/forbid');   
    `,
    errors: [{ message: createErrorMessage('./ts/require/forbid')}]
  }],
})

// @ts-ignore
ruleTester.run('require/*.(test|spec)(.js|.ts) ignore patterning', importLimitation, {
  valid: [{
    ...createOption('a.test.js'),
    code: `
      const {test} = require('./js/forbid');
    `
  }, {
    ...createOption('a.spec.js'),
    code: `
      const {test} = require('./js/forbid');
    `
  }, {
    ...createOption('b.test.ts'),
    code: `
      const {test} = require('./js/forbid');
    `
  }, {
    ...createOption('b.spec.ts'),
    code: `
      const {test} = require('./js/forbid');
    `
  }],
  invalid: []
})

