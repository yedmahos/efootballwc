const fs = require('fs');
const path = require('path');
const dataFile = path.join(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

if (!data.teams["TBD"]) {
  data.teams["TBD"] = {
    "id": "TBD",
    "country": "TBD",
    "player": "TBD",
    "code": "un",
    "color": "#666666",
    "manager": "TBD"
  };
}

const match13 = data.matches.find(m => m.id === 13);
if (!match13) {
  data.matches.push({
    "id": 13,
    "matchday": 7,
    "home": "TBD",
    "away": "TBD",
    "homeScore": null,
    "awayScore": null,
    "status": "upcoming",
    "kickoff": "2026-07-04T14:00:00.000Z",
    "stadium": "Wembley Stadium",
    "stage": "knockout"
  });
}

const match14 = data.matches.find(m => m.id === 14);
if (!match14) {
  data.matches.push({
    "id": 14,
    "matchday": 8,
    "home": "TBD",
    "away": "TBD",
    "homeScore": null,
    "awayScore": null,
    "status": "upcoming",
    "kickoff": "2026-07-05T14:00:00.000Z",
    "stadium": "Wembley Stadium",
    "stage": "knockout"
  });
}

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated data.json');
