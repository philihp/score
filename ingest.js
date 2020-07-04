// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')

const players = []

const lookup = {}

fs.createReadStream(`./18xx2007.csv`)
  .pipe(csv())
  .on('data', (data) => {
    const createdAt = new Date(data.start).toISOString()
    const updatedAt =
      data.end !== '' ? new Date(data.end).toISOString() : createdAt
    const dat = {
      id: data.id,
      createdAt,
      updatedAt,
      location: 'Springhill Suites, Portland Oregon',
      event: '2007 NW Rail Gaming Tournament',
      director: 'dave-blanchard',
      description: data.game,
      game: '18xx',
      players: [],
      results: [],
    }

    if (data.p1 && data.p1.length > 1) {
      dat.players.push(lookup[data.p1] || data.p1)
      players.push(lookup[data.p1] || data.p1)
      dat.results.push({
        player: lookup[data.p1] || data.p1,
        score: Number.parseInt(data.s1, 10),
      })
    }
    if (data.p2 && data.p2.length > 1) {
      dat.players.push(lookup[data.p2] || data.p2)
      players.push(lookup[data.p2] || data.p2)
      dat.results.push({
        player: lookup[data.p2] || data.p2,
        score: Number.parseInt(data.s2, 10),
      })
    }
    if (data.p3 && data.p3.length > 1) {
      dat.players.push(lookup[data.p3] || data.p3)
      players.push(lookup[data.p3] || data.p3)
      dat.results.push({
        player: lookup[data.p3] || data.p3,
        score: Number.parseInt(data.s3, 10),
      })
    }
    if (data.p4 && data.p4.length > 1) {
      dat.players.push(lookup[data.p4] || data.p4)
      players.push(lookup[data.p4] || data.p4)
      dat.results.push({
        player: lookup[data.p4] || data.p4,
        score: Number.parseInt(data.s4, 10),
      })
    }
    if (data.p5 && data.p5.length > 1) {
      dat.players.push(lookup[data.p5] || data.p5)
      players.push(lookup[data.p5] || data.p5)
      dat.results.push({
        player: lookup[data.p5] || data.p5,
        score: Number.parseInt(data.s5, 10),
      })
    }
    if (data.p6 && data.p6.length > 1) {
      dat.players.push(lookup[data.p6] || data.p6)
      players.push(lookup[data.p6] || data.p6)
      dat.results.push({
        player: lookup[data.p6] || data.p6,
        score: Number.parseInt(data.s6, 10),
      })
    }
    dat.results.sort((a, b) => b.score - a.score)
    if (!dat.results[0].score) {
      dat.results = []
    }
    fs.writeFileSync(
      `matches/18xx/2004-NW/${data.id}.json`,
      JSON.stringify(dat)
    )
  })
  .on('finish', () => {
    players.sort()
    players.forEach((id) => {
      const name = id
        .split('-')
        .map((s) => s[0].toUpperCase() + s.slice(1))
        .join(' ')
      fs.writeFileSync(`players/18xx/${id}.json`, JSON.stringify({ id, name }))
    })
  })
