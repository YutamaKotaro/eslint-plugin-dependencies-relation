import {CommentInfo} from "./cash";
import {contextCash} from "./cash";

export function compare(commentInfo: CommentInfo) {
  const {
    allowPath,
  } = commentInfo

  if (!allowPath || allowPath.length === 0) return true

  const baseFile = contextCash.get().getFilename()
  for (const _alloOnlypath of allowPath) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}*`)
    if (reg.test(baseFile)) return false
  }

  return true
}
