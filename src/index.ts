import { importLimitation } from './rules/import'
import { requireLimitation } from './rules/require'

const rules = {
  'dependency-relation/import': 2,
  'dependency-relation/require': 2,
}

export = {
  rules: {
    import: importLimitation,
    require: requireLimitation,
  },
  configs: {
    preset: {
      rules,
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          },
        },
      },
    },
    presetJs: {
      rules,
    },
    presetVue: {
      rules,
      settings: {
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
          },
        },
      },
    },
  },
}
