import 'babel-polyfill'
import tmp from 'tmp'
import scribble from 'scribbletune'
import { exec } from 'child_process'

const clip = scribble.clip({
  notes: 'F#m C#m Dmaj Bm Emaj Amaj Dmaj C#m Amaj',
  pattern: 'x_x_x_--'.repeat(8)
})

const playClip = (clip) => {
  const temporaryFileName = tmp.fileSync().name
  scribble.midi(clip, temporaryFileName)
  exec(`timidity ${temporaryFileName}`)
}

playClip(clip)
