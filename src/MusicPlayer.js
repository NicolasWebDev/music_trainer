import _ from 'lodash'
import { execSync } from 'child_process'
import tmp from 'tmp'
import scribble from 'scribbletune'

const POSSIBLE_NOTES = (
  'b3' +
  ' c4 c#4 d4 d#4 e4 f4 f#4 g4 g#4 a4 a#4 b4' +
  ' c5 c#5 d5 d#5 e5 f5 f#5 g5 g#5 a5 a#5 b5' +
  ' c6 c#6 d6 d#6'
).split(' ')

export default class MusicPlayer {
  static play (phrase) {
    this.playClip(scribble.clip({
      notes: phrase,
      pattern: 'x___'.repeat(phrase.length)
    }))
    return phrase
  }

  static playRandomPhrase (numberOfNotes) {
    return this.play(this.randomPhrase(numberOfNotes))
  }

  static randomPhrase (numberOfNotes) {
    return _.times(numberOfNotes, this.randomNote)
  }

  static randomNote () {
    return _.sampleSize(POSSIBLE_NOTES)[0]
  }

  static playClip (clip) {
    const temporaryFileName = tmp.fileSync().name
    scribble.midi(clip, temporaryFileName)
    execSync(`timidity ${temporaryFileName}`)
  }
}
