const start = Date.now();
const getHash = require('./day10');
const prefix = 'hxtvlmkl';

const hexToBin = str =>
  str
    .split('')
    .map(c =>
      Number.parseInt(c, 16)
        .toString(2)
        .padStart(4, '0'),
    )
    .join('');

const disk = new Array(128)
  .fill(0)
  .map((v, i) => `${prefix}-${i}`)
  .map(getHash)
  .map(hexToBin);

const used = disk.reduce((acc, v) => acc + v.replace(/0/g, '').length, 0);

console.log('Used:', used);

const disk2d = disk.map(s => s.split(''));

const roots = [];
const root = id => {
  let _root = id;
  while (roots[_root] != _root) {
    roots[_root] = roots[roots[_root]];
    _root = roots[_root];
  }
  return _root;
};
const create = id => {
    roots[id] = id;
  }

const add = (parent, child) => {
  const proot = root(parent);
  const croot = root(child);
  if (proot !== croot) {
    roots[croot] = proot;
  }
};
const getId = (i,j) => i*128+j + 1;

for (let i = 0; i<128; i++) {
  for (let j = 0; j< 128; j++) {
    if (disk2d[i][j] === '1') {
      const id = getId(i,j);
      //create group
      create(id);
      //connect up
      if (i > 0 && disk2d[i-1][j] === '1') {
        add(getId(i-1,j), id);
      }
      if (j > 0 && disk2d[i][j-1] === '1') {
        add(getId(i,j-1), id);
      }
    }
  }
}

for (let i = 0; i<10; i++) {
  let str = '';
  for (let j = 0; j< 10; j++) {
    const id = getId(i,j);
    if (disk2d[i][j] === '0') {
      str += '.'.padStart(5);
    } else {
      str += `${root(getId(i,j))}`.padStart(5);
    }
  }
  console.log(str);
}
const set = new Set(roots.map((v, id) => root(id)).filter(Boolean));
console.log('Groups',set.size);
console.log('time:',(Date.now() - start) / 1000, 's');
