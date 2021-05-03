# eslint-plugin-dependency-relation
Import relation linting rule for ESLint.
We can also use this in typescript.

## Installation
Install [ESLint](https://github.com/eslint/eslint) before using this plugin.
To make sure how to install eslint, please visit [eslint page](https://github.com/eslint/eslint)

```
yarn add eslint-plugin-dependency-relation -D
```

or

```
npm install eslint-plugin-dependency-relation -D
```

## Configuration

### for js project
You can use this plugin by adding below info to `.eslintrc`.

```json
{
  "plugins": ["dependency-relation"],
  "extends": ["plugin:dependency-relation/presetJs"]
}
```

### for ts project
If you'd like this plugin in ts project, need to install [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser).

```
yarn add -D typescript @typescript-eslint/parser
```
or
```
npm i --save-dev typescript @typescript-eslint/parser
```

You can use this plugin by adding below properties to `.eslintrc`.

```json
{
  "plugins": ["dependency-relation"],
  "extends": ["plugin:dependency-relation/preset"]
}
```

if you'd like to do manual configuration, please see this section [doc](## Manual Configuration(ts))

## Rules
Note: This plugin is beta-version yet.So... there isn't a lot of features.

### import
To make sure detail, please see [this doc](https://github.com/YutamaKotaro/eslint-plugin-dependencies-relation/blob/main/docs/rules/import.md).
`import` is the rule to limit importing file from a lot of location.

Let's say there are three directories and files.

```json
┝ app.ts
┝ repository
│　　└ index.ts
└ infrastracture
    ┝ index.ts
    └ mysql.ts
```

Besides, Let's say there are the rules you want to limit.

- don't allow accessing `mysql.ts` directory. (e.g import {save} from './infrastracture/mysql').
- instead of that, allow accessing `mysql` module via `index.ts`
- don't allow accessing `infrastracture` besides `repository directory`

In these case, this plugin show you against the rules.

```
import path ../infrastructure is not allowed from this file  dependency-relation/import
```

To use this plugin, you have to write comment, detail is [here](https://github.com/YutamaKotaro/eslint-plugin-dependencies-relation/blob/main/docs/rules/import.md).
Please make sure it.

### require
This rule is as same as import, but this rule expect requireSyntax.

## Manual Configuration(ts)
In order to set up manually, it's better to write it down in your `.eslintrc`.
Note: If you use preset, don't need this section.

```json
{
    "settings": {
        "import/resolver": {
          "node": {
            "extensions": [".ts", ".tsx", ".js", ".jsx"]
          }
        },
      "rules": {
        "dependency-relation/import": 2,
        "dependency-relation/require": 2
      }
    } 
}
```

In addition, if you'd like to ignore testing directories from this plugin.
It's better to use [ignorePatterns](https://eslint.org/docs/user-guide/configuring/ignoring-code#ignorepatterns-in-config-files) like this.

Note: At default, *.spec.js(ts) or *.test.js(ts) file will be ignored by this plugin. 

```json
{
  "ignorePatterns": ["tests/*spec.js"],
  "rules": {
    "dependency-relation/import": 0,
    "dependency-relation/require": 0
  }
}
```




