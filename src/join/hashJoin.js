export default function (left, leftAccessor, right, rightAccessor) {
  let output = [];
  let index = new Map();
  var i
  for(i = 0; i < left.length; i++) {
    let leftValue = leftAccessor(left[i]);
    if(!index.get(leftValue))
      index.set(leftValue, [])
    index.get(leftValue).push(left[i]);
  }
  for(i = 0; i < right.length; i++) {
    let leftValue = index.get(rightAccessor(right[i]));
    if(leftValue) {
      leftValue.forEach(val => output.push([val, right[i]]))
    }
  }
  return output;
}
