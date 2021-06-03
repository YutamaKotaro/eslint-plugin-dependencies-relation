import { createAllowFilePathRoot } from '../../src/utils/compare'
import { CommentInfo, rootComment, RootCommentInfo } from '../../src/utils/cash'
import { TYPES } from '../../src/utils/constants'
import { readRootCommentInfo } from '../../src/utils/read'

/*
    - src
       - component
             - index.js <- pattern1
             - b.js     <- pattern 2

 */
describe('shallow dir', () => {
  describe('pattern 1', () => {
    describe(`${TYPES.ALLOW}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/index.js',
        allowPath: ['src/app.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
        },
      ]
      let result: string[]
      beforeAll(() => {
        result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
      })
      test('path become same as commentInfo', () => {
        expect(result).toEqual(commentInfo.allowPath)
      })
    })
    describe(`${TYPES.ALLOW_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/index.js',
        allowPath: ['src/app.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW_ROOT,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
        },
      ]
      let result: string[]
      beforeAll(() => {
        result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
      })
      test('path become same as commentInfo', () => {
        expect(result).toEqual(commentInfo.allowPath)
      })
    })
    describe(`${TYPES.ALLOW_ONLY_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/index.js',
        allowPath: ['src/app.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW_ONLY_ROOT,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
        },
      ]
      let result: string[]
      beforeAll(() => {
        result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
      })
      test('path become same as commentInfo', () => {
        expect(result).toEqual(commentInfo.allowPath)
      })
    })
  })
  describe('pattern 2', () => {
    describe(`${TYPES.ALLOW}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        allowPath: ['src/app2.js'],
        filePath: 'src/component/b.js',
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW,
          allowPath: ['src/app.js'],
          filePath: 'src/component/index.js',
        },
      ]
      test('just only commentIfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/app2.js'])
      })
    })
    describe(`${TYPES.ALLOW_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        allowPath: ['src/app2.js'],
        filePath: 'src/component/b.js',
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW_ROOT,
          allowPath: ['src/app.js'],
          filePath: 'src/component/index.js',
        },
      ]
      test('allowPaths are merged', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/app2.js', 'src/app.js'])
      })
    })
    describe(`${TYPES.ALLOW_ONLY_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        allowPath: ['src/app2.js'],
        filePath: 'src/component/b.js',
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          type: TYPES.ALLOW_ONLY_ROOT,
          allowPath: ['src/app.js'],
          filePath: 'src/component/index.js',
        },
      ]
      test('just only rootCommentInfo filePath is used, because only-root means just only indexFile is allowed to import', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/index.js'])
      })
    })
  })
})

/*
    - src
      - components
          - index.js
          - Button
              - index.js <-- pattern 1
              - b.js     <-- pattern 2
 */

describe('deep dir', () => {
  describe('pattern 1', () => {
    describe(`${TYPES.ALLOW}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/index.js',
        allowPath: ['../index.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['../app.js'],
          type: TYPES.ALLOW,
        },
        { ...commentInfo, type: TYPES.ALLOW },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['../index.js'])
      })
    })
    describe(`${TYPES.ALLOW_ROOT}`, () => {
      test('just only rootCommentInfo is used', () => {
        const commentInfo: CommentInfo = {
          noRestriction: false,
          filePath: 'src/component/Button/index.js',
          allowPath: ['src/component/index.js'],
        }
        const rootCommentInfo: RootCommentInfo[] = [
          { ...commentInfo, type: TYPES.ALLOW_ROOT },
          {
            noRestriction: false,
            filePath: 'src/component/index.js',
            allowPath: ['src/app.js'],
            type: TYPES.ALLOW_ROOT,
          },
        ]
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/index.js', 'src/app.js'])
      })
    })
    describe(`${TYPES.ALLOW_ONLY_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/index.js',
        allowPath: ['src/component/index.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        { ...commentInfo, type: TYPES.ALLOW_ONLY_ROOT },
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
          type: TYPES.ALLOW_ONLY_ROOT,
        },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/index.js'])
      })
    })
  })
  describe('pattern 2', () => {
    describe(`${TYPES.ALLOW}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/b.js',
        allowPath: ['src/component/Button/index.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          type: TYPES.ALLOW,
          allowPath: ['src/app2.js'],
          filePath: 'src/component/Button/index.js',
          noRestriction: false,
        },
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
          type: TYPES.ALLOW,
        },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/Button/index.js'])
      })
    })
    describe(`${TYPES.ALLOW_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/b.js',
        allowPath: ['src/component/Button/index.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          type: TYPES.ALLOW_ROOT,
          allowPath: ['src/app2.js'],
          filePath: 'src/component/Button/index.js',
          noRestriction: false,
        },
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
          type: TYPES.ALLOW_ROOT,
        },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual([
          'src/component/Button/index.js',
          'src/app2.js',
          'src/app.js',
        ])
      })
    })
    describe(`${TYPES.ALLOW_ONLY_ROOT}`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/b.js',
        allowPath: ['src/component/Button/index.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          type: TYPES.ALLOW_ONLY_ROOT,
          allowPath: ['src/app2.js'],
          filePath: 'src/component/Button/index.js',
          noRestriction: false,
        },
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
          type: TYPES.ALLOW_ONLY_ROOT,
        },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/Button/index.js'])
      })
    })
    describe(`${TYPES.ALLOW_ONLY_ROOT}2`, () => {
      const commentInfo: CommentInfo = {
        noRestriction: false,
        filePath: 'src/component/Button/b.js',
        allowPath: ['src/component/Button/index2.js'],
      }
      const rootCommentInfo: RootCommentInfo[] = [
        {
          type: TYPES.ALLOW_ONLY_ROOT,
          allowPath: ['src/app2.js'],
          filePath: 'src/component/Button/index.js',
          noRestriction: false,
        },
        {
          noRestriction: false,
          filePath: 'src/component/index.js',
          allowPath: ['src/app.js'],
          type: TYPES.ALLOW_ONLY_ROOT,
        },
      ]
      test('just only commentInfo is used', () => {
        const result = createAllowFilePathRoot(commentInfo, rootCommentInfo)
        expect(result).toEqual(['src/component/Button/index.js'])
      })
    })
  })
})
