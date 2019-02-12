const fs = require('fs');
const raw = fs.readFileSync('./day12.txt', 'utf8');

const lines = raw.split('\n').filter(Boolean);

const pipes = lines.map((v, i) => ({parent: i, size: 1}));

const root = id => {
  let root = id;
  while (pipes[root].parent != root) {
    pipes[root].parent = pipes[pipes[root].parent].parent;
    root = pipes[root].parent;
  }
  return root;
};

const add = (parent, child) => {
  const proot = root(parent);
  const croot = root(child);
  if (proot !== croot) {
    // console.log(pipes, parent, child);
    pipes[croot].parent = proot;
    pipes[proot].size += pipes[croot].size;
    // console.log(pipes);
  }
};

lines
  .map(line => line.split(/(?: <->)?,?\s/))
  .forEach(arr => arr.slice(1).forEach(c => add(Number(arr[0]), Number(c))));
// console.log(pipes);
console.log('Group 0 size', pipes[root(0)].size);

console.log('Groups:', new Set(pipes.map((v,i) => root(i))).size);

console.log(moves);
