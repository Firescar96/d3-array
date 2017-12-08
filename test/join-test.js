var tape = require("tape"),
    arrays = require("../");

tape("join([], []).apply() returns []", function(test) {
  test.deepEqual(arrays.join([], []).apply(), []);
  test.end();
});

tape("join with one parameter an empty list returns []", function(test) {
  test.deepEqual(arrays.join([1,5,2,4,3], []).apply(), []);
  test.deepEqual(arrays.join([], [1,5,2,4,3]).apply(), []);
  test.end();
});

tape("join can change the data", function(test) {
  let operation = arrays.join([1,0,4,3], [4,7,3,9]);
  operation.data([1,2,3,4,5], [6,9,2,6,5,5]);
  test.deepEqual(operation.apply(), [[2,2], [5,5], [5,5]]);
  test.end();
});

tape("join returns the cartesian product", function(test) {
  test.deepEqual(arrays.join([1,2,3], [4,5,6]).predicate(() => true).apply(), [[1,4],[1,5],[1,6],[2,4],[2,5],[2,6],[3,4],[3,5],[3,6]]);
  test.deepEqual(arrays.join([1,2], [4,5,6]).predicate(() => true).apply(), [[1,4],[1,5],[1,6],[2,4],[2,5],[2,6]]);
  test.deepEqual(arrays.join([1,2,3], [4,5]).predicate(() => true).apply(), [[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]);
  test.end();
});

tape("join can reduce result", function(test) {
  let operation = arrays.join([1,2,3], [4,5,6]);
  operation.reduce((a,b) => a+b)
  operation.predicate(() => true)

  test.deepEqual(operation.apply(), [5,6,7,6,7,8,7,8,9]);
  test.end();
});

tape("join can use predicate to return values with sums > 6", function(test) {
  let operation = arrays.join([1,2,3], [4,5,6]);
  operation.predicate((a,b) => a+b > 6)
  test.deepEqual(operation.apply(), [[1,6],[2,5],[2,6],[3,4],[3,5],[3,6]]);

  operation.reduce((a,b) => a+b)
  test.deepEqual(operation.apply(), [7,7,8,7,8,9]);
  test.end();
});

tape("join can use predicate to perform equijoin", function(test) {
  let operation = arrays.join([{a:1,z:5},{a:1,z:10},{a:3,z:9}], [{a:1,b:7},{a:3,b:8},{a:6,b:9}]);
  operation.key(x => x.a)
  operation.predicate((a,b) => a == b)
  test.deepEqual(operation.apply(), [[{a:1,z:5},{a:1,b:7}],[{a:1,z:10},{a:1,b:7}],[{a:3,z:9},{a:3,b:8}]]);
  operation.leftKey(x => x.z)
  test.deepEqual(operation.apply(), []);
  operation.rightKey(x => x.b)
  test.deepEqual(operation.apply(), [[{a:3,z:9},{a:6,b:9}]]);
  test.end();
});

tape("join with key function works", function(test) {
  let operation = arrays.join([{a:1,z:11},{a:2,z:12},{a:3,z:13}], [{a:4,b:7},{a:5,b:8},{a:6,b:9}]);
  operation.key(x => x.a)
  operation.predicate(() => true)
  test.deepEqual(operation.apply(), [
    [{a:1,z:11},{a:4,b:7}],[{a:1,z:11},{a:5,b:8}],[{a:1,z:11},{a:6,b:9}],
    [{a:2,z:12},{a:4,b:7}],[{a:2,z:12},{a:5,b:8}],[{a:2,z:12},{a:6,b:9}],
    [{a:3,z:13},{a:4,b:7}],[{a:3,z:13},{a:5,b:8}],[{a:3,z:13},{a:6,b:9}]
  ]);
  test.end();
});

tape("join can use sort merge join on an empty list", function(test) {
  let operation = arrays.join([], []);
  operation.key(x => x.a)
  operation.join(arrays.sortMergeJoin)
  test.deepEqual(operation.apply(), []);
  operation.data([{a:1,z:5},{a:1,z:10},{a:3,z:9}], []);
  test.deepEqual(operation.apply(), []);
  operation.data([], [{a:1,z:5},{a:1,z:10},{a:3,z:9}]);
  test.deepEqual(operation.apply(), []);
  test.end();
});

tape("join can use sort merge join on unique values", function(test) {
  let operation = arrays.join([1,5,8,3,4], [1,8,4,72]);
  operation.join(arrays.sortMergeJoin)
  test.deepEqual(operation.apply(), [[1,1], [4,4], [8,8]]);
  test.end();
});

tape("join can use sort merge join on duplicate values", function(test) {
  let operation = arrays.join([{a:1,z:5},{a:1,z:10},{a:3,z:9},{a:1,z:10}], [{a:1,b:7},{a:3,b:8},{a:6,b:9}]);
  operation.key(x => x.a)
  operation.join(arrays.sortMergeJoin)
  test.deepEqual(operation.apply(), [[{a:1,z:5},{a:1,b:7}],[{a:1,z:10},{a:1,b:7}], [{a:1,z:10},{a:1,b:7}],[{a:3,z:9},{a:3,b:8}]]);
  test.end();
});
