# dependency-relation/import
This rule is for import.

In order to use this rule, you have to write comment and inform this plugin about your rules.
(If you have requirement or great idea, or find a bug, please let me know that.)

## specifying limitation
You can write limitation as comment in the file.

Comment rules are just only three rules.

- write `@dependency-relation: <option>: <file path>` as comment
- file path is `relative path`
- can specify files or directories

Note: You don't have to specify test directory (e.g test and __test__ and so on and so forth), because `*.spec.*` and `*.test.*` file are ignored from this plugin (If you use this naming rule).
In a case that don't use this naming(`*.test.*` or `*.spec.*`) rules for test file, it's better for you to use  [ignoring Code](https://eslint.org/docs/user-guide/configuring/ignoring-code#ignorepatterns-in-config-files) and ignore test directory.

### options
This plugin has three options.

|option name| description|
|:--:|:---------:|
|allow| Each file setting. Written rule is effective just only file where comment is written.|
|allow@root| This option is available in index file. Written rule is inherited by other files in same dir.|
|allowOnly@root| This option is available in index file. This option forbids direct accessing besides index file.|

Note: For now allow@root and allowOnly@root is effective for just only files in same dir. Hence, if dir exist, you have to write comment in index file of the dir (performance issue.)

## How to use
Let's see how to use this plugin!!

You have to write rule as a comment at first.

```javascript
// infrastructure.js  <- you don't need write this comment. This is mere showing file name in doc.
// @dependency-relation: allow: ./repository
export default function() {
  
}
```

Let's remember syntax.

```javascript
// @dependency-relation: <option>: <file path>
```

In that comment, options is `allow` and file path is `./repository` (<- dir).
Hence, that means "Just only repository directory's files are allowed to import this file".
If other files try to import this file, this plugin warns you against the rules.

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

s

