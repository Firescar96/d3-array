export default function (left, leftAccessor, right, rightAccessor, predicate) {
  predicate = predicate || function(){return true};
  let output = [];
  for(var i = 0; i < left.length; i++) {
    for(var j = 0; j < right.length; j++) {
      if(predicate(leftAccessor(left[i]), rightAccessor(right[j]))) {
        output.push([left[i], right[j]]);
      }
    }
  }
  return output;
}
