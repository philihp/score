// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require('csv-parser')
const fs = require('fs')

const players = []

const lookup = {
  '18xxperson': 'jonathan-work',
  abnrgr: 'michael-monical',
  adam1515: 'adam-mcdiarmid',
  'andy-mesa': 'andy-mesa',
  beardbru: 'bruce-beard',
  cheesinglee: 'chee-sing-lee',
  chichi: 'chisholm-gentry',
  claudius: 'nathan-wagner',
  clayton: 'greg-clayton',
  daroj: 'christopher-rao',
  deniz: 'deniz-bucak',
  dix: 'bill-dixon',
  espee: 'dave-blanchard',
  'ex-raven': 'paul-work',
  islandia: 'stephen-yu',
  jaysixa: 'joshua-gottesman',
  jeffheuer: 'jeff-heuer',
  jon_g: 'jonathan-geruntho',
  karazak: 'keith-williams',
  kelly: 'kelly-krieble',
  markmenm: 'tom-rodriguez',
  mikewill: 'mike-williams',
  mjshaver: 'mike-shaver',
  neutron: 'mike-brumm',
  'orca-willy': 'derek-yeung',
  outsidepasser: 'michael-alexander',
  pgh_gamer: 'dean-brandt',
  'rail-baron': 'mark-derrick',
  shaz: 'shaz-iqbal',
  shirleydulcey: 'shirley-dulcey',
  stormcrow: 'scott-ellis',
  talbatross: 'chris-talbot',
  thecardboardbox: 'sterling-tian',
  triplejalltheway: 'jonathan-jang',
  phil: 'philihp-busby',
}

fs.createReadStream(`./18xx.csv`)
  .pipe(csv())
  .on('data', (data) => {
    const createdAt = new Date(data.start).toISOString()
    const updatedAt =
      data.end !== '' ? new Date(data.end).toISOString() : createdAt
    const dat = {
      id: data.id,
      createdAt,
      updatedAt,
      location: '22nd Annual Portland 18xx Convention',
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
    fs.writeFileSync(`matches/18xx/${data.id}.json`, JSON.stringify(dat))
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
