import {CommentInfo} from "./cash";
import {contextCash} from "./cash";

export function compare(commentInfo: CommentInfo) {
  const {
    allowPath,
    noRestriction
  } = commentInfo
  if (!allowPath || noRestriction) return false

  const baseFile = contextCash.get().getFilename()
  for (const _alloOnlypath of allowPath) {
    const reg = new RegExp(String.raw`^${_alloOnlypath}*`)
    console.log(reg.test(baseFile), baseFile,'***', _alloOnlypath)
    if (!reg.test(baseFile)) return true
  }

  return false
}
