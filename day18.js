const fs = require('fs');
const input = fs
  .readFileSync('./day18.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(s => s.split(' '));

const getFromReg = ({registers}, name) => {
  if (!registers[name]) {
    registers[name] = 0;
  }
  return registers[name];
};

const getVal = (ctx, val) => {
  if (val.length === 1) {
    const code = val.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      return getFromReg(ctx, val);
    }
  }
  return Number(val);
};

const step = (ctx, val = 1) => {
  ctx.cp += val;
};

const snd = (ctx, args) => {
  ctx.sendQueue.push(getVal(ctx, args[0]));
  ctx.sendCount++;
  step(ctx);
};
const set = (ctx, args) => {
  ctx.registers[args[0]] = getVal(ctx, args[1]);
  step(ctx);
};
const add = (ctx, args) => {
  ctx.registers[args[0]] += getVal(ctx, args[1]);
  step(ctx);
};
const mul = (ctx, args) => {
  ctx.registers[args[0]] *= getVal(ctx, args[1]);
  step(ctx);
};
const mod = (ctx, args) => {
  ctx.registers[args[0]] %= getVal(ctx, args[1]);
  step(ctx);
};

const rcv = (ctx, args) => {
  if (ctx.testRun) {
    const val = getVal(ctx, args[0]);
    if (val !== 0) {
      return ctx.sendQueue.pop();
    }
  } else {
    if (ctx.receiveQueue.length) {
      const val = ctx.receiveQueue.shift();
      ctx.registers[args[0]] = val;
      step(ctx);
      return false;
    } else {
      return true;
    }
  }
};

const jgz = (ctx, args) => {
  if (getVal(ctx, args[0]) > 0) {
    step(ctx, getVal(ctx, args[1]));
  } else {
    step(ctx);
  }
};

const commands = {
  snd,
  set,
  add,
  mul,
  mod,
  rcv,
  jgz,
};

const exec = ctx => {
  const cmd = input[ctx.cp];
  return commands[cmd[0]](ctx, cmd.slice(1));
}

const ctxTest = {
  testRun: true,
  cp: 0,
  sendCount: 0,
  registers: {},
  sendQueue: [],
  receiveQueue: [],
};

let received = undefined;

do {
  received = exec(ctxTest);
} while (received === undefined && ctxTest.cp < input.length);

console.log('Part 1', received);

const ctx0 = {
  cp: 0,
  sendCount: 0,
  registers: {p:0},
  sendQueue: [],
};
const ctx1 = {
  cp: 0,
  sendCount: 0,
  registers: {p:1},
  sendQueue: [],
};
ctx0.receiveQueue = ctx1.sendQueue;
ctx1.receiveQueue = ctx0.sendQueue;

while (!(exec(ctx0) && exec(ctx1)));

console.log('Part 2', ctx1.sendCount);
