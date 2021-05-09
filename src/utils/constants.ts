export const TYPES = {
  ALLOW: 'allow', // each file setting.
  ALLOW_ROOT: 'allow@root', // root setting just only for index file.This rule is applyed for same directory's file with this file. But each setting takes a priority.
  ALLOW_ONLY_ROOT: 'allowOnly@root', // root setting just only for index file, but forbid accessing to other file in same directory's file.
  NONE: 'none', // no detected config
} as const
export type T_TYPES = typeof TYPES[keyof typeof TYPES]

export const STATEMENT_TYPES = {
  IMPORT: 'import',
  REQUIRE: 'require',
} as const
export type T_STATEMENT_TYPES = typeof STATEMENT_TYPES[keyof typeof STATEMENT_TYPES]
