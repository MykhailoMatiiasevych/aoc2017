const fs = require('fs');

const input = fs.readFileSync('./day5.txt', 'utf8');

const program = input.split('\n').filter(Boolean).map(Number);

//const program = [0,3,0,1,-3] => 5
const p1 = program.slice();

const exec = p => {
  const next = p + p1[p];
  p1[p] ++;
  return next;
}

let c = 0;
let step = 0;
do {
  step ++;
  c = exec(c);
} while (c>=0 && c< p1.length)

console.log('Steps:', step);

const p2 = program.slice();

const exec2 = p => {
  const next = p + p2[p];
  p2[p] = p2[p] >= 3 ? p2[p] - 1 : p2[p] + 1;
  return next;
}

c = 0;
step = 0;
do {
  step ++;
  c = exec2(c);
} while (c>=0 && c< p2.length)

console.log('Steps 2:', step);
