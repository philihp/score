// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')

const players = []

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
      dat.players.push(data.p1)
      players.push(data.p1)
      dat.results.push({
        player: data.p1,
        score: Number.parseInt(data.s1, 10),
      })
    }
    if (data.p2.length > 1) {
      dat.players.push(data.p2)
      players.push(data.p2)
      dat.results.push({
        player: data.p2,
        score: Number.parseInt(data.s2, 10),
      })
    }
    if (data.p3.length > 1) {
      dat.players.push(data.p3)
      players.push(data.p3)
      dat.results.push({
        player: data.p3,
        score: Number.parseInt(data.s3, 10),
      })
    }
    if (data.p4.length > 1) {
      dat.players.push(data.p4)
      players.push(data.p4)
      dat.results.push({
        player: data.p4,
        score: Number.parseInt(data.s4, 10),
      })
    }
    if (data.p5.length > 1) {
      dat.players.push(data.p5)
      players.push(data.p5)
      dat.results.push({
        player: data.p5,
        score: Number.parseInt(data.s5, 10),
      })
    }
    if (data.p6.length > 1) {
      dat.players.push(data.p6)
      players.push(data.p6)
      dat.results.push({
        player: data.p6,
        score: Number.parseInt(data.s6, 10),
      })
    }
    dat.results.sort((a, b) => b.score - a.score)
    fs.writeFileSync(`players/${data.id}.json`, JSON.stringify(dat))
  })
  .on('finish', () => {
    players.sort()
    players.forEach((id) => {
      console.log(id)
      fs.writeFileSync(`players/18xx/${id}.json`, JSON.stringify({ id }))
    })
  })
