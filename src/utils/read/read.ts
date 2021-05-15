import { extract, parseFilePaths, parseArgStrings } from './lib'
import { cashComment, CommentInfo } from '../cash'

// Note: files limited are just only file, if try to apply file and directory.... performance will become worse.

export function readComment(path: string): CommentInfo {
  let commentInfo = cashComment.getComment(path)

  if (!commentInfo) {
    commentInfo = createCommentInfo(path)
    cashComment.setComment(path, commentInfo)
  }

  return commentInfo
}

/*
   create CommentInfo from filePath
 */
export function createCommentInfo(filePath: string): CommentInfo {
  // read file
  const extractedComment = extract(filePath)
  if (!extractedComment) {
    return {
      noRestriction: true,
      filePath,
    }
  }
  const { fileStrings } = parseArgStrings(extractedComment)
  const filePaths = parseFilePaths(fileStrings, filePath)

  return {
    filePath,
    noRestriction: false,
    allowPath: filePaths,
  }
}
