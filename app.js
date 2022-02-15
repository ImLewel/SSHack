'use strict';

const readline = require('readline-sync');
const fs = require('fs');

//regExps
const re = /"value\\":\d*/g;
const re2 = /\d*-\d*-\d*\w\d*:\d*:\d*.\d*\w/g;

console.log(`Please, make sure you transfered:
wallet.json, mission.json, achievements.json
from your device to pc\n`.toUpperCase());

//set path to the directory with files
const dirpath = readline.question("Enter path to the folder with files: ");

//wallet
const path = dirpath + '\\wallet.json';
const amount = readline.question("\nEnter amount you want: ");
const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
const str = `"value\\":${amount}`;

//scores
const pathScore = dirpath + '\\missions.json';
const scores = readline.question("\nHow much scores do you want: ");
const dataScore = fs.readFileSync(pathScore, { encoding: 'utf8', flag: 'r' });

//date
let date = new Date();
let dateToReplace = date.toISOString().substring(0, 23) + '123' + 'Z';

//modificate wallet data
const mod1 = data.replace(re, str);
const mod2 = mod1.replace(re2, dateToReplace);

try {
  fs.writeFileSync(pathScore, dataScore.replace(/"scoreMultiplierLastVisit\\":\d*/, `"scoreMultiplierLastVisit\\":${scores}`));
    fs.writeFileSync(path, mod1);
    console.log(`\n${amount} coins are now in your wallet.`);
    console.log(`${scores} score multipliers now.`);
}
finally {
    fs.writeFileSync(path, mod2);
    console.log(`Time updated: ${dateToReplace}\n`);
}

console.log('Done!');






