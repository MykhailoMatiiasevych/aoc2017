const skip = (current, n, arr) => {
  current += n;
  while (current >= arr.length) {
    current -= arr.length;
  }
  return current;
};

const reverse = (_arr, current, v) => {
  let arr = _arr.slice();
  if (v > 1) {
    const merged = arr.concat(arr);
    const rev = merged.slice(current, current + v).reverse();
    [].splice.apply(merged, [].concat(current, v, rev));
    if (current + v >= arr.length) {
      arr = merged
        .slice(arr.length, arr.length + current)
        .concat(merged.slice(current, arr.length));
    } else {
      arr = merged.slice(0, arr.length);
    }
  }
  return arr;
};

const generateKnotHashArray = (input, rounds = 64) => {
  let arr = new Array(256).fill(0).map((v, id) => id);
  let current = 0;

  const length = input.length;
  for (let round = 0; round < rounds; round++) {
    input.forEach((v, i) => {
      arr = reverse(arr, current, v);
      current = skip(current, v + i + round * length, arr);
    });
  }
  return arr;
};

const hash = a =>
  a
    .reduce((r, i) => r ^ i, 0)
    .toString(16)
    .padStart(2, '0');

const generateKnotHash = input => {
  const arr = generateKnotHashArray(input);
  let str = '';
  for (let i = 0; i < 16; i++) {
    const a = arr.slice(i * 16, (i + 1) * 16);
    str += hash(a);
  }
  return str;
};

const generateKnotHashFromString = str =>
  generateKnotHash(
    str
      .split('')
      .map(s => s.charCodeAt(0))
      .concat([17, 31, 73, 47, 23]),
  );

const part1 = () => {
  const input = [197, 97, 204, 108, 1, 29, 5, 71, 0, 50, 2, 255, 248, 78, 254, 63];

  const arr = generateKnotHashArray(input, 1);

  console.log('Result:', arr[0] * arr[1]);
};

const part2 = () => {
  const input = '197,97,204,108,1,29,5,71,0,50,2,255,248,78,254,63';
    // .split('')
    // .map(s => s.charCodeAt(0))
    // .concat([17, 31, 73, 47, 23]);

  const str = generateKnotHashFromString(input);

  console.log('Hash', str);
};

// part1();
// part2();


module.exports = generateKnotHashFromString;
