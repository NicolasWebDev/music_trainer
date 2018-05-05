import { randomNote, randomPhrase } from '../src/index'
import _ from 'lodash'

describe('index', () => {
  describe('randomNote', () => {
    it('returns a string', () => {
      expect(_.isString(randomNote())).toBe(true)
    })
  })

  describe('randomPhrase', () => {
    it('returns an array', () => {
      expect(_.isArray(randomPhrase())).toBe(true)
    })
  })
})
