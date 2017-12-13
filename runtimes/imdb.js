import {csvParse, dsvFormat} from 'd3-dsv';
import fs from 'fs';

import hashJoin from '../src/join/hashJoin';
import nestedLoopJoin from '../src/join/nestedLoopJoin';
import sortMergeJoin from '../src/join/sortMergeJoin';
import { performance } from 'perf_hooks';

let a,b, res;
let data = fs.readFileSync('./movies.csv', {encoding:'utf8'})
let movies = dsvFormat('|').parseRows(data, d => {
  return {id: d[0], title: d[1], year: d[2], runtime:parseInt(d[3])};
})
data = fs.readFileSync('./castMembers5000000.csv', {encoding:'utf8'})
let castMembers = dsvFormat('|').parseRows(data, d => {
  return {movieId: d[0], id: d[1]};
})

let longestRuntime = movies.reduce((x,y) => {
  return isNaN(y.runtime) || x > parseInt(y.runtime) ? x : parseInt(y.runtime)
}, 0);
let leftAccessor = x => x.movieId;
let rightAccessor = x => x.id;
let predicate = (a, la, b, lb) => b.runtime == longestRuntime && la(a) == lb(b);
let reducer = (a, b) => [a,b]

console.log(longestRuntime);

a = performance.now()
res = hashJoin(castMembers, leftAccessor, movies, rightAccessor, predicate, reducer)
b = performance.now()
console.log('hashJoin', res.length, b-a);

a = performance.now()
res = sortMergeJoin(castMembers, leftAccessor, movies, rightAccessor, predicate, reducer)
b = performance.now()
console.log('sortMergeJoin', res.length, b-a);

a = performance.now()
res = nestedLoopJoin(castMembers, leftAccessor, movies, rightAccessor, predicate, reducer)
b = performance.now()
console.log('nestedLoopJoin', res.length, b-a);
