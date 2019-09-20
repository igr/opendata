"use strict";

class OpenDataScores {
    constructor() {
        this.size = 0
        this.health = new Map();
        this.score = new Map();
    }
}

const od = require('./src/data/opendata');
const ods = require('./src/data/opendata_scores');

const fs = require('fs')

const calculatedScores = new OpenDataScores();

od.resources.forEach(res => {
    const score = ods[res.id]

    // size
    calculatedScores.size = calculatedScores.size + 1

    // health
    calculatedScores.health[score.health] = (calculatedScores.health[score.health] || 0) + 1

    // scores
    const detailedScores = score.scores
    for (var prop in detailedScores) {
        if (Object.prototype.hasOwnProperty.call(detailedScores, prop)) {
            calculatedScores.score[prop] = calculatedScores.score[prop] || new Map()
            calculatedScores.score[prop][detailedScores[prop]] = (calculatedScores.score[prop][detailedScores[prop]] || 0) + 1
        }
    }
});

// save

const calculatedScoresJson = JSON.stringify(calculatedScores);

fs.writeFileSync("./src/data/opendata_stats.json", calculatedScoresJson);

// TODO add logging