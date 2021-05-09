# dependency-relation/import
This rule is for import.

In order to use this rule, you have to write comment and inform this plugin about your rules.
(If you have requirement or great idea, or find a bug, please let me know that.)

## specifying limitation
You can write limitation as comment in the file.

Comment rules are just only three rules.

- write `@dependency-relation: allow:` as comment
- file path is `relative path`
- can specify files or directories

Note: You don't have to specify test directory(e.g test and __test__ and so on and so forth), because `*.spec.*` and `*.test.*` file are ignored from this plugin (If you use this naming rule).
In a case that don't use the naming(`*.test.*` or `*.spec.*`) rules for test file, it's better for you to use  [ignoring Code](https://eslint.org/docs/user-guide/configuring/ignoring-code#ignorepatterns-in-config-files) and ignore test directory.

```javascript
// infrastructure.js  <- you don't need write this comment. This is mere showing file name in markdown.
// @dependency-relation: allow: ./repository
export default function() {
  
}
```

This comment means "It's just only repository directory's file to be allowed importing this file".
Hence, if other file try to import this file, this plugin warns you against the rules.
Of course, you can write comment as line or block.

```javascript
// app.js
import infrastracture from './infrastracture';
// error! import path "./infrastructure" is not allowed from this file  dependency-relation/import
```

On the other hand, repository directory's file can import this file.

```javascript
// repository/index.jsx
import infrastructure from './infrastracture';
// no Error
```

To specify multi limitations, write like this.

```javascript
// @dependency-relation: allow: ./repository.js ./hoge.js ../utils
```

UseCase is the best section to learn how to use this plugin.


## useCase
Let's say there are three directories and files.

```json
┝ app.js
┝ repository
│　　└ index.ts
└ infrastracture
    ┝ index.ts
    └ mysql.ts
```

Besides, Let's say there are the rules you want to limit.

- 1.don't allow direct accessing `mysql.ts`. (e.g import {save} from './infrastructure/mysql').
- 2.instead of that, allow accessing just only `mysql` module via `index.ts` (e.g import {save} from './infrastructure')
- 3.don't allow accessing `infrastracture` besides `repository directory`

### forbid direct accessing `mysql.ts` and allow just only accessing `mysql` via `index.ts`
To achieve this limitation. You have to write comment in `infrastructure/mysql.ts`, like this.

```javascript
// @dependency-relation: allow: ./index.ts
export function mysql() {}
```

This limitation forbids importing this file except `infrastructure/index.ts`.
This achieves rule 1 and 2.

### don't allow accessing `infrastracture` besides `repository`
To achieve this limitation. You have to write comment in `infrastructure/index.ts`.

```javascript
// @dependency-relation: allow: ../repository
export * as mysql from './mysql.ts'
```

This limitation forbids import this file except `repository directory`.
Hence, all repository directory's files can access this file, but other file can't access this file.
This achieves rule 3.



