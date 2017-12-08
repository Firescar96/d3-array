export default function (left, leftAccessor, right, rightAccessor, predicate) {
  predicate = predicate || function(){return true};
  let sortFunction = ((a,b) => a < b ? -1 : a > b ? 1 : 0);
  let output = [];
  let sortedLeft = left.map(a => a).sort((a,b) => sortFunction(leftAccessor(a), leftAccessor(b)));
  let sortedRight = right.map(a => a).sort((a,b) => sortFunction(rightAccessor(a), rightAccessor(b)));
  let leftIndex = 0, rightIndex = 0; //iterator for values
  let leftRun = 0, rightRun = 0; //tracks runs to handle non-unique values
  while (leftIndex < sortedLeft.length || rightIndex < sortedRight.length) {
    let curLeft = sortedLeft[leftIndex];
    let curRight = sortedRight[rightIndex];
    if (curLeft && curRight && sortFunction(leftAccessor(curLeft), rightAccessor(curRight)) == 0) {
          if(predicate(curLeft, curRight)) {
            output.push([curLeft, curRight]);
          }

          let nextLeft = sortedLeft[leftIndex + 1];
          let nextRight = sortedRight[rightIndex + 1];
          if(nextLeft && leftAccessor(nextLeft) && !rightRun) {
            leftRun++;
            leftIndex++;
          } else if(nextRight && rightAccessor(nextRight) && !leftRun) {
            rightRun++;
            rightIndex++;
          } else {
            leftIndex += leftRun ? -leftRun : 1;
            rightIndex += rightRun ? -rightRun : 1;
            leftRun = rightRun = 0;
          }
      } else if (!curRight || (curLeft && sortFunction(leftAccessor(curLeft), rightAccessor(curRight)) < 0))
          leftIndex++;
      else // if (right > left)
          rightIndex++;
  }
  return output;
}
