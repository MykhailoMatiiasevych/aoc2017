const fs = require('fs');

const raw = fs.readFileSync('./day16.txt', 'utf8');

const init = new Array(16).fill(0).map((v, i) => String.fromCharCode(97 + i));

const getPos = (arr, c) => arr.findIndex(v => v === c);

const spin = (arr, val) => arr.slice(-val).concat(arr.slice(0, -val));
const exchange = (arr, A, B) => {
  const res = arr.slice();
  const t = res[A];
  res[A] = res[B];
  res[B] = t;
  return res;
};
const partner = (arr, A, B) => exchange(arr, getPos(arr,A), getPos(arr,B));
const getFunc = vs => {
  let f;
  switch (vs[0]) {
    case 's':
      f = spin;
      break;
    case 'x':
      f = exchange;
      break;
    case 'p':
      f = partner;
      break;
  }
  return [f].concat(vs.slice(1));
};

const parse = s => {
  const arr = s.split('');
  const res = [arr[0]];
  let acc = '';
  for (let i = 1; i<arr.length; i++) {
    if (arr[i] === '/') {
      res.push(acc);
      acc = '';
    } else {
      acc += arr[i];
    }
  }
  res.push(acc);
  return res;
}

const dance = raw
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
  //.map(s => /^([sxp])([^\/]{1,2})(?:\/([^\/]{1,2}))?$/.exec(s).slice(1))
  .map(parse)

  .map(getFunc);

const doDance = (moves, init) =>
  moves.reduce((arr, vs) => vs[0].apply(null, [arr].concat(vs.slice(1))), init);

console.log('Part 1', doDance(dance, init).join(''));

const orig = init.join('');
let current = init;
let cycle = 0;
do  {
  current = doDance(dance, current);
  cycle++;
} while (current.join('') !== orig)

console.log(cycle);
for (let i = 0; i< (1000000000 % cycle); i++) {
  current = doDance(dance, current);
}
console.log('Part 2', current.join(''));
