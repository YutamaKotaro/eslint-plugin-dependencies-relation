import { TSESLint } from '@typescript-eslint/experimental-utils'

export type CommentInfo = {
  noRestriction: boolean
  allowPath?: string[]
  errors?: string
}
export type RootCommentInfo = {
  noRestriction: boolean
  type: 'allow' | 'allow@root' | 'allowOnly@root' | 'none'
  filePath?: string[]
}

class CashComment {
  public store: {
    [key: string]: CommentInfo
  } = {}
  getComment(key: string): CommentInfo {
    return this.store[key]
  }
  setComment(key: string, commentInfo: CommentInfo) {
    this.store[key] = commentInfo
  }
}
export const cashComment = new CashComment()

class RootComment {
  public store: {
    [key: string]: RootCommentInfo
  } = {}
  getComment(key: string): RootCommentInfo {
    return this.store[key]
  }
  setComment(key: string, commentInfo: RootCommentInfo) {
    this.store[key] = commentInfo
  }
}
export const rootComment = new RootComment()

type Context = TSESLint.RuleContext<string, unknown[]>
class ContextCash {
  public context = {} as Context
  init(context: Context) {
    this.context = context
  }
  get() {
    return this.context
  }
}

export const contextCash = new ContextCash()
