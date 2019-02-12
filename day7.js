const fs = require('fs');

const raw = fs.readFileSync('./day7.txt', 'utf8');
const input = raw.split('\n').filter(Boolean);

// const input = [
//   'pbga (66)',
//   'xhth (57)',
//   'ebii (61)',
//   'havc (66)',
//   'ktlj (57)',
//   'fwft (72) -> ktlj, cntj, xhth',
//   'qoyq (66)',
//   'padx (45) -> pbga, havc, qoyq',
//   'tknk (41) -> ugml, padx, fwft',
//   'jptl (61)',
//   'ugml (68) -> gyxo, ebii, jptl',
//   'gyxo (61)',
//   'cntj (57)',
// ];

const tree = {};
const createNode = (name, parent, weight) => {
  let node = {children: [], name};
  if (tree[name]) {
    node = tree[name];
  } else {
    tree[name] = node;
  }
  if (parent) {
    node.parent = parent;
    tree[parent].children.push(name);
  }
  if (weight) {
    node.weight = weight;
  }
};

input.forEach(d => {
  const arr = d.split(/,?\s(?:->)?\s?/);
  createNode(arr[0], null, Number(arr[1].substr(1, arr[1].length - 2)));
  if (arr.length > 2) {
    arr.slice(2).forEach(n => createNode(n, arr[0]));
  }
});

//console.log(JSON.stringify(tree, null, 4));

let root = Object.keys(tree)[0];

while (tree[root].parent) {
  root = tree[root].parent;
}

console.log('Root', root);

const updateTotalWeight = name => {
  const node = tree[name];
  if (node.children.length === 0) {
    node.total = node.weight;
  } else {
    node.total = node.weight + node.children.reduce((acc, n) => acc + updateTotalWeight(n), 0);
  }
  return node.total;
};

updateTotalWeight(root);

// console.log(JSON.stringify(tree, null, 4));

const sumChildren = node => node.children.reduce((acc, n) => acc + tree[n].total, 0);

const wrong = Object.keys(tree)
  .map(key => tree[key])
  .filter(node => node.children.length > 0)
  .filter(node => sumChildren(node) / node.children.length !== tree[node.children[0]].total)
  .sort((a,b) => a.total - b.total)[0];

console.log(wrong);
//console.log(sumChildren(wrong), wrong.children.length,sumChildren(wrong) / wrong.children.length, tree[wrong.children[0]].total)
const weights = wrong.children.reduce((acc, name) => {
  const w = tree[name].total;
  if (acc[w]) {
    acc[w].push(name);
  } else {
    acc[w] = [name];
  }
  return acc;
}, {});

console.log(weights);

const wrongWeight = Number(Object.keys(weights).find(key => weights[key].length === 1));
const correctWeight = Number(Object.keys(weights).find(key => weights[key].length != 1));
const correct = tree[weights[wrongWeight][0]].weight - wrongWeight + correctWeight
console.log('Correct weight:', correct);
