import fs from 'fs';
import { matches, teams } from '../lib/data.js';

fs.writeFileSync('data.json', JSON.stringify({ teams, matches }, null, 2));
console.log('Successfully wrote data.json');
