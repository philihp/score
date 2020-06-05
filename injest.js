// This is meant to be a one-time run on CSV files such as those in
// https://gist.github.com/philihp/b4bbb546a230cdbeea38463202b47898
// however it might come in useful again, someday

const csv = require("csv-parser");
const fs = require("fs");

const players = {
  "Ken ?": "ken",
  "Philihp ?": "phil",
  "Philihp Busby": "phil",
  "Aaron Dixon": "aaron",
  "Ville Helio": "ville",
  "Sean George": "sean",
  "Matt Johnson": "matt",
  "A C": "adam",
};

fs.createReadStream(`${__dirname}/tta2.csv`)
  .pipe(csv())
  .on("data", (data) => {
    let dat = {
      id: data.id,
      createdAt: new Date(data.start).toISOString(),
      updatedAt: new Date(data.end).toISOString(),
      description: data.name,
      game: data.game === "Through the Ages" ? "tta" : "tta2",
      players: [],
      results: [],
    };
    if (data.g1.length > 1) {
      dat.players.push({ id: players[data.g1] || data.g1 });
      dat.results.push({ player: players[data.g1] || data.g1, score: data.s1 });
      if (players[data.g1] === undefined) console.log(data.g1);
    }
    if (data.g2.length > 1) {
      dat.players.push({ id: players[data.g2] || data.g2 });
      dat.results.push({ player: players[data.g2] || data.g2, score: data.s2 });
      if (players[data.g2] === undefined) console.log(data.g2);
    }
    if (data.g3.length > 1) {
      dat.players.push({ id: players[data.g3] || data.g3 });
      dat.results.push({ player: players[data.g3] || data.g3, score: data.s3 });
      if (players[data.g3] === undefined) console.log(data.g3);
    }
    if (data.g4.length > 1) {
      dat.players.push({ id: players[data.g4] || data.g4 });
      dat.results.push({ player: players[data.g4] || data.g4, score: data.s4 });
      if (players[data.g4] === undefined) console.log(data.g4);
    }
    let str = JSON.stringify(dat, null, 2);
    fs.writeFileSync(`matches/${data.id}.json`, str);
  });
