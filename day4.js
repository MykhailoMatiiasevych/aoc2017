const fs = require('fs');

const input = fs.readFileSync('./day4.txt', 'utf8');

console.log(
  'corrects 1:',
  input
    .split('\n')
    .filter(Boolean)
    .map(s =>
      s.split(' ').reduce(
        (acc, s) => {
          if (acc.w[s]) {
            acc.val = 0;
          } else {
            acc.w[s] = 1;
          }
          return acc;
        },
        {val: 1, w: {}}
      ),
    )
    .reduce((acc, {val}) => acc + val,0),
);

console.log(
  'corrects 2:',
  input
    .split('\n')
    .filter(Boolean)
    .map(s =>
      s.split(' ')
      .map(s => s.split('').sort().join(''))
      .reduce(
        (acc, s) => {
          if (acc.w[s]) {
            acc.val = 0;
          } else {
            acc.w[s] = 1;
          }
          return acc;
        },
        {val: 1, w: {}}
      ),
    )
    .reduce((acc, {val}) => acc + val,0),
);
