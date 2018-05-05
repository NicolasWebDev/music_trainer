import MusicPlayer from '../src/MusicPlayer'
import _ from 'lodash'

const mockOn = (object, methodName, returnValue) => jest
  .spyOn(object, methodName)
  .mockReturnValue(returnValue)

describe('MusicPlayer', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('randomNote', () => {
    it('returns a string', () => {
      expect(_.isString(MusicPlayer.randomNote())).toBe(true)
    })
  })

  describe('playRandomPhrase', () => {
    it('calls randomPhrase', () => {
      mockOn(MusicPlayer, 'randomPhrase', ['a4', 'a4'])
      mockOn(MusicPlayer, 'playClip')

      MusicPlayer.playRandomPhrase(5)

      expect(MusicPlayer.randomPhrase).toHaveBeenCalled()
    })
  })

  describe('randomPhrase', () => {
    it('returns an array', () => {
      expect(_.isArray(MusicPlayer.randomPhrase(5))).toBe(true)
    })

    it('returns an array of strings', () => {
      expect(_.isString(MusicPlayer.randomPhrase(5)[0])).toBe(true)
    })
  })
})
