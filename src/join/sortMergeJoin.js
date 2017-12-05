export default function (left, leftAccessor, right, rightAccessor, predicate) {
  predicate = predicate || ((a,b) => a < b ? -1 : a > b ? 1 : 0);
  let output = [];
  let sortedLeft = left.map(a => a).sort((a,b) => predicate(leftAccessor(a), leftAccessor(b)));
  let sortedRight = right.map(a => a).sort((a,b) => predicate(leftAccessor(a), leftAccessor(b)));
  let leftIndex = 0, rightIndex = 0; //iterator for values
  let leftRun = 0, rightRun = 0; //tracks runs to handle non-unique values
  while (leftIndex < sortedLeft.length || rightIndex < sortedRight.length) {
    let curLeft = sortedLeft[leftIndex];
    let curRight = sortedRight[rightIndex];
    if (curLeft && curRight && predicate(leftAccessor(curLeft), leftAccessor(curRight)) == 0) {
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
      } else if (!curRight || (curLeft && predicate(leftAccessor(curLeft), leftAccessor(curRight)) < 0))
          leftIndex++;
      else // if (right > left)
          rightIndex++;
  }
  return output;
}
