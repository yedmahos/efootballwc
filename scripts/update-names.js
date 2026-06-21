import fs from 'fs';

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const nameMap = {
  "ENG": "saptak dey",
  "ARG": "angshu dey",
  "FRA": "aditya dey",
  "POR": "soham dey"
};

const oldNameMap = {
  "Player A": "saptak dey",
  "Player B": "angshu dey",
  "Player C": "aditya dey",
  "Player D": "soham dey"
};

// Update team player names
for (const [id, team] of Object.entries(data.teams)) {
  team.player = nameMap[id];
}

// Update match MVP and goal scorers
for (const match of data.matches) {
  if (match.mvp && oldNameMap[match.mvp]) {
    match.mvp = oldNameMap[match.mvp];
  }
  
  if (match.goals) {
    for (const goal of match.goals) {
      if (oldNameMap[goal.scorer]) {
        goal.scorer = oldNameMap[goal.scorer];
      }
    }
  }
}

fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('Player names updated successfully');
