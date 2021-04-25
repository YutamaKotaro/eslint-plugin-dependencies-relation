import {CommentInfo} from "./cash";
import {contextCash} from "./cash";

export function compare(commentInfo: CommentInfo) {
  const {
    allowOnlyPath,
  } = commentInfo

  if (!allowOnlyPath || allowOnlyPath.length === 0) return true

  const baseFile = contextCash.get().getFilename()
  for (const _alloOnlypath of allowOnlyPath) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}*`)
    if (reg.test(baseFile)) return false
  }

  return true
}
