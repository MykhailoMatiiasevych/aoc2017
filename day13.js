const start = Date.now();


const fs = require('fs');
const raw = fs.readFileSync('./day13.txt', 'utf8');

const lines = raw.split('\n').filter(Boolean);
const firewall = lines.map(l => l.split(':').map(Number));

const isZero = (layer, range) => layer % ((range - 1) * 2) === 0;

const res = firewall.reduce((acc,i) => isZero(i[0], i[1]) ? acc + i[0]*i[1] : acc, 0);

console.log('Severity:', res);

let delay = 0;
while (firewall.some(i => isZero(i[0] + delay, i[1]))) {
  delay ++;
}

console.log('Delay:', delay);

console.log('time:',(Date.now() - start) / 1000, 's');
