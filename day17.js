const input = 376;
//const input = 3;

let arr = [0];

const getNext = current => current+1 == arr.length ? 0 : current+1;

const insert = (current, val) => {
  let next = input % arr.length + current + 1;
  const nc = next > arr.length ? next - arr.length : next;
  arr.splice(nc, 0, val);
  return nc ;
}

let current = 0;
for (let i=1; i <= 2017; i++) {
  current = insert(current, i);
}

console.log('Part 1', arr[getNext(current)]);


let length = 1;
let ind1 = 0;
const fakeInsert = (current, val) => {
  let next = input % length + current + 1;
  const nc = next > length ? next - length : next;
  length ++;
  if (nc === 1) {
    ind1 = val;
  }
  return nc ;
}

current = 0;
arr = [0];
for (let i=1; i <= 50000000; i++) {
  current = fakeInsert(current, i);
}
console.log('Part 2', ind1);
