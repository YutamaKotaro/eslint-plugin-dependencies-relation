declare module 'extract-comments' {
  export type Location = {
    line: number,
    column: number,
  }
  export type LineComment = {
    type: 'LineComment',
    value: string,
    range: number[],
    loc: {
      start: Location,
      end: Location,
    },
    raw: string
  }
  export type BlockComment = {
    type: 'BlockComment',
    value: string,
    range: [start: number, end: number],
    codeStart: number,
    raw: string,
    code: Context
  }
  export type Context = {
    context: {
      type: 'declaration'
      name: 'App',
      value: string
      string: string,
      match: string[] // <- have some prototypes
    },
    value: string
    range: [start: number, end: number]
    loc: {
      start: Location
      end: Location
    }
  }
  export type ExtractResult = (LineComment | BlockComment)[]
  export function extract(fileStr: string): ExtractResult
  export default extract
}



