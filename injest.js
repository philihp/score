// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')
const { shuffle } = require('fast-shuffle')

const players = {
  'Ken ?': 'ken',
  'Philihp ?': 'phil',
  'Philihp Busby': 'phil',
  'Aaron Dixon': 'aaron',
  'Ville Helio': 'ville',
  'Sean George': 'sean',
  'Matt Johnson': 'matt',
  'A C': 'adam',
}

fs.createReadStream(`${__dirname}/tta.csv`)
  .pipe(csv())
  .on('data', (data) => {
    const createdAt = new Date(data.date).toISOString()
    const updatedAt = createdAt
    const dat = {
      id: data.name,
      createdAt,
      updatedAt,
      location: 'TTA App',
      description: data.name,
      game: data.game === 'Through the Ages' ? 'tta' : 'tta2',
      players: [],
      results: [],
    }
    if (data.g1.length > 1) {
      dat.players.push({ id: players[data.g1] || data.g1 })
      dat.results.push({
        player: players[data.g1] || data.g1,
        score: Number.parseInt(data.s1, 10),
      })
    }
    if (data.g2.length > 1) {
      dat.players.push({ id: players[data.g2] || data.g2 })
      dat.results.push({
        player: players[data.g2] || data.g2,
        score: Number.parseInt(data.s2, 10),
      })
    }
    if (data.g3.length > 1) {
      dat.players.push({ id: players[data.g3] || data.g3 })
      dat.results.push({
        player: players[data.g3] || data.g3,
        score: Number.parseInt(data.s3, 10),
      })
    }
    if (data.g4.length > 1) {
      dat.players.push({ id: players[data.g4] || data.g4 })
      dat.results.push({
        player: players[data.g4] || data.g4,
        score: Number.parseInt(data.s4, 10),
      })
    }
    dat.players = shuffle(dat.players)
    dat.results.sort((a, b) => b.score - a.score)
    fs.writeFileSync(
      `matches/tta2/${data.name}.json`,
      JSON.stringify(dat, undefined, 2)
    )
  })
