const input = 325489;

// 1 - 8 - 16 - 24 - 32

let current = 0;
let min = 0;
let max = 1;
do {
  current++;
  min = max + 1;
  max += current * 8;
} while (max < input);

console.log('current', current);
console.log('min', min);
console.log('max', max);


const q = (max - min + 1) / 4;

console.log('q', q);


max = min + q - 1;
while (max < input) {
  min += q;
  max += q;
}

console.log('min2', min);
console.log('max2', max);

const zero = min + Math.floor((max - min) / 2);
const delta = Math.abs(input - zero);

console.log('zero', zero);
console.log('delta', delta);


console.log('Path: ', current + delta);

// PART 2
// Dump solution
const size = 99;
const center = 49;

const arr = Array(size).fill(0).map(x => Array(size).fill(0));

const getVal = (x,y) => arr[x+1][y] + arr[x+1][y+1] + arr[x+1][y-1] +
                        arr[x][y+1] + arr[x][y-1] +
                        arr[x-1][y] + arr[x-1][y+1] + arr[x-1][y-1];

const verify = val => {
  if (val > input) {
    throw new Error(val);
  }
}

arr[center][center] = 1;
let distance = 1;

try {

do {
  for (let i = 0; i < distance*2; i++) {
    const x = center + distance - 1 - i;
    const y = center + distance;
    const next = getVal(x,y);
    verify(next);
    arr[x][y] = next;
  }
  for (let i = 0; i < distance*2; i++) {
    const x = center - distance;
    const y = center + distance - 1 - i;
    const next = getVal(x,y);
    verify(next);
    arr[x][y] = next;
  }
  for (let i = 0; i < distance*2; i++) {
    const x = center - distance + 1 + i;
    const y = center - distance;
    const next = getVal(x,y);
    verify(next);
    arr[x][y] = next;
  }
  for (let i = 0; i < distance*2; i++) {
    const x = center + distance;
    const y = center - distance + 1 + i;
    const next = getVal(x,y);
    verify(next);
    arr[x][y] = next;
  }
  distance ++;
} while (true);

} catch (err) {
  console.log('Next',err.message);
}
