// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')

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

fs.createReadStream(`./18xx.csv`)
  .pipe(csv())
  .on('data', (data) => {
    const createdAt = new Date(data.start).toISOString()
    const updatedAt = createdAt
    const dat = {
      id: data.id,
      createdAt,
      updatedAt,
      location: '22nd Annual Portland 18xx Convention',
      description: data.game,
      game: data.game === 'Through the Ages' ? 'tta' : 'tta2',
      players: [],
      results: [],
    }
    if (data.p1.length > 1) {
      dat.players.push({ id: players[data.p1] || data.p1 })
      dat.results.push({
        player: players[data.p1] || data.p1,
        score: Number.parseInt(data.s1, 10),
      })
    }
    if (data.p2.length > 1) {
      dat.players.push({ id: players[data.p2] || data.p2 })
      dat.results.push({
        player: players[data.p2] || data.p2,
        score: Number.parseInt(data.s2, 10),
      })
    }
    if (data.p3.length > 1) {
      dat.players.push({ id: players[data.p3] || data.p3 })
      dat.results.push({
        player: players[data.p3] || data.p3,
        score: Number.parseInt(data.s3, 10),
      })
    }
    if (data.p4.length > 1) {
      dat.players.push({ id: players[data.p4] || data.p4 })
      dat.results.push({
        player: players[data.p4] || data.p4,
        score: Number.parseInt(data.s4, 10),
      })
    }
    if (data.p5.length > 1) {
      dat.players.push({ id: players[data.p5] || data.p5 })
      dat.results.push({
        player: players[data.p5] || data.p5,
        score: Number.parseInt(data.s5, 10),
      })
    }
    dat.results.sort((a, b) => b.score - a.score)
    fs.writeFileSync(
      `matches/18xx/${data.id}.json`,
      JSON.stringify(dat, undefined, 2)
    )
  })
