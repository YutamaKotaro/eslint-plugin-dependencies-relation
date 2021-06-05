# Basic Example

```tree
./src
├── repository
│   └── index.ts
├── infrastracture
│   ├── mysql.ts
│   └── index.ts
└── app.ts

```


```bash
$ yarn eslint src

/eslint-plugin-dependencies-relation/example/basic/src/app.ts
   5:1  error  import path ./infrastracture is not allowed from this file        dependency-relation/import
  11:1  error  import path ./infrastracture/mysql is not allowed from this file  dependency-relation/import

/eslint-plugin-dependencies-relation/example/basic/src/repository/index.ts
  8:1  error  import path ../infrastracture/mysql is not allowed from this file  dependency-relation/import

✖ 3 problems (3 errors, 0 warnings)


```
