const fs = require('fs');

const raw = fs.readFileSync('./day8.txt', 'utf8');
const input = raw.split('\n').filter(Boolean);

// const input = [
// 'b inc 5 if a > 1',
// 'a inc 1 if b < 5',
// 'c dec -10 if a >= 1',
// 'c inc -20 if c == 10',
// ];

const registers = {};
let highest = 0;

const getRegValue = name => {
  if (!registers[name]) {
    registers[name] = 0;
  }
  return registers[name];
}

const doOp = (reg, op, _val) => {
  const val = Number(_val);
  const rv = getRegValue(reg);
  if (op === 'inc') {
    registers[reg] = rv + val;
  } else {
    registers[reg] = rv - val;
  }
  if (registers[reg] > highest) {
    highest = registers[reg];
  }
}

const check = (reg, op, _val) => {
  const val = Number(_val);
  const rv = getRegValue(reg);
  switch (op) {
    case '>': return rv > val;
    case '<': return rv < val;
    case '>=': return rv >= val;
    case '<=': return rv <= val;
    case '==': return rv == val;
    case '!=': return rv != val;
  }
  throw new Error(`Unknown OP ${op}`);
}

input.forEach(s => {
  const ar = s.split(' ');
  if (check(ar[4],ar[5],ar[6])){
    doOp(ar[0],ar[1],ar[2])
  }
});

//console.log(registers);
const max = Math.max(...Object.values(registers));
console.log('Max:', max);
console.log('Highest:', highest);
