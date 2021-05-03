import { TSESLint } from "@typescript-eslint/experimental-utils";


export type CommentInfo = {
  noRestriction: boolean
  allowPath?: string[]
  errors?: string
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

type Context = TSESLint.RuleContext<any, any>
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
