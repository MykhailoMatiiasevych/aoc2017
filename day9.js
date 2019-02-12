const fs = require('fs');
const raw = fs.readFileSync('./day9.txt', 'utf8');

//const raw = '{{<!!d>},{<{o"i!a,<{i<a>},{<!!>},{<!!>}}';

//const tree = {level:0, children: []};
const trash = false;

const readTrash = ind => {
  const c = raw.charAt(ind);
  if (c === '>') {
    return {s:0,l:0};
  }
  if (c === '!') {
    const {s, l} = readTrash(ind + 2);
    return {s, l: l+2 };
  }
  const {s, l} = readTrash(ind + 1);
  return {s: s+1, l: l+1};
};

const readGroup = (ind, level) => {
  const group = {
    children: [],
    level,
  };
  let c;
  do {
    c = raw.charAt(ind);
    //console.log(ind, c);
    if (c === '<') {
      //console.log('read trash');
      const {s,l} = readTrash(ind + 1);
      group.children.push(s);
      ind += l + 1;
      //console.log(' trash done', ind, s, l);
    } else if (c === '{') {
      //console.log('read group', level + 1);
      const {g, ni} = readGroup(ind + 1, level + 1);
      group.children.push(g);
      ind = ni;
      //console.log(JSON.stringify(g, null, 4), ni);
    } else if (c === '}') {
      //console.log('exit', group, ind);
      return {g: group, ni: ind};
    }
    ind++;
  } while (ind <= raw.length);
  return group;
};

const getScore = root => {
  try {
  return root.children.reduce((s, n) => s + (typeof n != 'number' ? getScore(n) : 0), root.level);
} catch (err) {
  console.log('ERROR');
  console.log(JSON.stringify(root, null, 4));
}
};

const getGarbage = root => {
  try {
    return root.children.reduce((s, n) => s + (typeof n != 'number' ? getGarbage(n) : n), 0);
  } catch (err) {
    console.log(JSON.stringify(root, null, 4));
  }
};

const tree = readGroup(0, 0);
const score = getScore(tree);
// console.log(JSON.stringify(tree, null, 4));
console.log('Score', score);

// console.log(JSON.stringify(tree, null, 4));

const garbage = getGarbage(tree);
console.log('Garbage', garbage);
