import {importLimitation} from "./rules/import";

export = {
  rules: {
    import: importLimitation,
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
