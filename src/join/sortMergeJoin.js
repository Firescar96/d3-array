export default function (left, leftAccessor, right, rightAccessor, predicate) {
  predicate = predicate || (() => true);
  let output = [];
  let sortedLeft = left.map(a => a).sort((a,b) => leftAccessor(a) < leftAccessor(b) ? -1: 1);
  let sortedRight = right.map(a => a).sort((a,b) => rightAccessor(a) < rightAccessor(b) ? -1: 1);
  let leftIndex = 0, rightIndex = 0; //iterator for values
  let leftRun = 0, rightRun = 0; //tracks runs to handle non-unique values
  while (leftIndex < sortedLeft.length || rightIndex < sortedRight.length) {
    let curLeft = sortedLeft[leftIndex];
    let curRight = sortedRight[rightIndex];
    if (curLeft && curRight && leftAccessor(curLeft) == rightAccessor(curRight)) {
          output.push([curLeft, curRight]);

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
      } else if (!curRight || (curLeft && leftAccessor(curLeft) < rightAccessor(curRight)))
          leftIndex++;
      else // if (right > left)
          rightIndex++;
  }
  return output;
}
