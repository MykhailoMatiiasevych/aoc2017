const input = [2,8,8,5,4,2,3,1,5,5,1,2,15,13,5,14];

const states = {};

const getFP = state => state.join('-');

const checkState = state => {
  const fp = getFP(state);
  if (states[fp]) {
    return false;
  }
  states[fp] = 1;
  return true;
};

const spread = (state, id) => {
  let num = state[id];
  state[id] = 0;
  let i = id;
  while (num-- > 0) {
    i++;
    if (i == state.length) i = 0;
    state[i]++;
  }
}

const findMax = state => {
  const max = Math.max.apply(null, state);
  return state.indexOf(max);
}

const state = input.slice();
let step = 0;
do {
  step ++;
  spread(state, findMax(state));
} while(checkState(state));

console.log('Steps:', step);

// Reuse previous state

step = 0;
const fp = getFP(state);
do {
  step ++;
  spread(state, findMax(state));
} while(getFP(state) != fp);

console.log('Loop:', step);
