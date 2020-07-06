// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')

const players = []

fs.createReadStream(`./matches/18xx/2011-NW/18xx2011.csv`)
  .pipe(csv())
  .on('data', (data) => {
    const createdAt = new Date(data.start).toISOString()
    const updatedAt =
      data.end !== '' ? new Date(data.end).toISOString() : createdAt
    const dat = {
      id: data.id,
      createdAt,
      updatedAt,
      event: 'NW Rail Gaming Tournament 2011',
      description: data.game,
      // director: 'mark-derrick',
      game: '18xx',
      players: [],
      results: [],
    }

    if (data.p1 && data.p1.length > 1) {
      const pn = data.p1.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s1, 10),
      })
    }
    if (data.p2 && data.p2.length > 1) {
      const pn = data.p2.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s2, 10),
      })
    }
    if (data.p3 && data.p3.length > 1) {
      const pn = data.p3.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s3, 10),
      })
    }
    if (data.p4 && data.p4.length > 1) {
      const pn = data.p4.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s4, 10),
      })
    }
    if (data.p5 && data.p5.length > 1) {
      const pn = data.p5.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s5, 10),
      })
    }
    if (data.p6 && data.p6.length > 1) {
      const pn = data.p6.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s6, 10),
      })
    }
    if (data.p7 && data.p7.length > 1) {
      const pn = data.p7.toLowerCase()
      dat.players.push(pn)
      players.push(pn)
      dat.results.push({
        player: pn,
        score: Number.parseInt(data.s7, 10),
      })
    }
    dat.results.sort((a, b) => b.score - a.score)
    if (!dat.results[0].score) {
      dat.results = []
    }
    fs.writeFileSync(
      `matches/18xx/2011-NW/${data.id}.json`,
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
