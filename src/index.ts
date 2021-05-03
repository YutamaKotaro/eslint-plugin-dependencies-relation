import {importLimitation} from "./rules/import";
import {requireLimitation} from "./rules/require";

export = {
  rules: {
    import: importLimitation,
    require: requireLimitation
  },
  configs: {
    recommended: {
      rules: {
        'dependency-relation/import': 2
      },
      parser: '@typescript-eslint/parser',
      parserOptions: { sourceType: 'module' },
      plugins: ['@typescript-eslint'],
      settings: {
        "import/resolver": {
          node: {
            "extensions": [".ts", ".tsx", ".js", ".jsx"]
          }
        }
      }
    }
  }
}
