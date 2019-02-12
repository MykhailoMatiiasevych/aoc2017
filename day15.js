const start = Date.now();

class Generator {
  constructor(init, factor, cond = 1) {
    this.last = init;
    this.factor = factor;
    this.cond = cond - 1;
    this.div = 2147483647;
  }
  next() {
    this.last = (this.last * this.factor) % this.div;
    if ((this.last & this.cond) === 0) {
      return this.last;
    } else {
      return this.next();
    }
  }
}

const lastBits = val => val & 0xFFFF;

const aStart = 783;
const bStart = 325;

const genA = new Generator(aStart, 16807);
const genB = new Generator(bStart, 48271);

// for (let i = 0; i< 10; i++) {
//   console.log(lastBits(genA.next()).padStart(18), lastBits(genB.next()).padStart(18));
// }

let count = 0;
for (let i = 0; i< 40000000; i++) {
  if (lastBits(genA.next()) === lastBits(genB.next())) {
    count++;
  }
  // if (i % 1000000 === 0) {
  //   console.log(i);
  // }
}

console.log('Part 1', count);


const genA2 = new Generator(aStart, 16807, 4);
const genB2 = new Generator(bStart, 48271, 8);

let count2 = 0;
for (let i = 0; i< 5000000; i++) {
  if (lastBits(genA2.next()) === lastBits(genB2.next())) {
    count2++;
  }
  // if (i % 1000000 === 0) {
  //   console.log(i);
  // }
}

console.log('Part 2', count2);


console.log('Time:', (Date.now() - start) / 1000, 's');
