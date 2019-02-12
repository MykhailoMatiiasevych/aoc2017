const fs = require('fs');
const raw = fs.readFileSync('./day11.txt', 'utf8');


const distance = (a, b) => Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y), Math.abs(b.z - a.z));

const zero = {x: 0, y: 0, z: 0};
const current = {x: 0, y: 0, z: 0};
let max = 0;
raw.trim().split(',').forEach(d => {
  switch (d) {
    case 'n':
      current.x++;
      current.z--;
      break;
    case 'ne':
      current.y++;
      current.z--;
      break;
    case 'se':
      current.x--;
      current.y++;
      break;
    case 's':
      current.x--;
      current.z++;
      break;
    case 'sw':
      current.y--;
      current.z++;
      break;
    case 'nw':
      current.x++;
      current.y--;
      break;
  }
  const nd = distance(zero, current);
  max = Math.max(nd, max);
});

console.log('Part 1', distance(zero, current));
console.log('Part 2', max);
