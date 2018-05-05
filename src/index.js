import 'babel-polyfill'
import tmp from 'tmp'
import scribble from 'scribbletune'
import { exec } from 'child_process'
import readline from 'readline'
import _ from 'lodash'

const POSSIBLE_NOTES = (
  'b3' +
  ' c4 c#4 d4 d#4 e4 f4 f#4 g4 g#4 a4 a#4 b4' +
  ' c5 c#5 d5 d#5 e5 f5 f#5 g5 g#5 a5 a#5 b5' +
  ' c6 c#6 d6 d#6'
).split(' ')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const randomNote = () => _.sampleSize(POSSIBLE_NOTES)[0]

const randomClip = (numberOfNotes) => scribble.clip({
  notes: randomPhrase(numberOfNotes),
  pattern: 'x_x_x_--'.repeat(8)
})

const randomPhrase = (numberOfNotes) => _.times(numberOfNotes, randomNote)

const clip = scribble.clip({
  notes: 'F#m C#m Dmaj Bm Emaj Amaj Dmaj C#m Amaj',
  pattern: 'x_x_x_--'.repeat(8)
})

const playClip = (clip) => {
  const temporaryFileName = tmp.fileSync().name
  scribble.midi(clip, temporaryFileName)
  exec(`timidity ${temporaryFileName}`)
}

const ask = (promptMessage) => new Promise(
  (resolve, reject) => {
    rl.question(`${promptMessage}: `, (input) => resolve(input))
  }
)

const main = async () => {
  const nbNotes = await ask('Number of notes in the phrase')
}

// main()

export { randomNote, randomPhrase }
