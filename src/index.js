import 'babel-polyfill'
import readline from 'readline'
import MusicPlayer from './MusicPlayer'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const ask = (promptMessage) => new Promise(
  (resolve, reject) => {
    rl.question(`${promptMessage}: `, (input) => resolve(input))
  }
)

const applyAction = (action, nbNotes, lastPhrase) => {
  switch (action) {
    case 'r':
      return MusicPlayer.play(lastPhrase)
    case 'n':
      return MusicPlayer.playRandomPhrase(nbNotes)
    case 'q':
      console.log('Chao')
      process.exit()
    default:
      console.log(`Error: the action ${action} is not recognized`)
      return lastPhrase
  }
}

const main = async () => {
  const nbNotes = await ask('Number of notes in the phrase')
  let playedPhrase = MusicPlayer.playRandomPhrase(nbNotes)
  while (true) {
    const action = await ask('Action ([r]epeat, [n]ew phrase, [q]uit)')
    playedPhrase = applyAction(action, nbNotes, playedPhrase)
  }
}

main()
  .then(() => {}, error => { console.log(error) })
  .then(() => process.exit())
