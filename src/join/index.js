import nljoin from './nestedLoopJoin';

class Join {
  constructor (left, right) {
    this.left = left;
    this.right = right;
    this.leftKeyFunction = this.defaultKeyFunction;
    this.rightKeyFunction = this.defaultKeyFunction;
    this.joinFunction = nljoin;
    this.reduceFunction = null;
  }

  data (left, right) {
    this.left = left;
    this.right = right;
    return this;
  }

  key (value) {
    if(value == null) {
      return this.keyFunction;
    }
    this.leftKeyFunction = value;
    this.rightKeyFunction = value;
    return this;
  }

  leftKey (value) {
    //if there is an argument to this it must be a function
    if(value == null) {
      return this.keyFunction;
    } else {
      this.leftKeyFunction = value;
      return this;
    }
  }

  rightKey (value) {
    //if there is an argument to this it must be a function
    if(value == null) {
      return this.keyFunction;
    } else {
      this.rightKeyFunction = value;
    }
    return this;
  }

  defaultKeyFunction (x) {
    return x;
  }

  join (value) {
    this.joinFunction = value;
    return this;
  }

  reduce (value) {
    this.reduceFunction = value;
    return this;
  }

  predicate (value) {
    this.predicateFunction = value;
    return this;
  }

  apply() {
    let joinOutput =  this.joinFunction(this.left, this.leftKeyFunction, this.right, this.rightKeyFunction, this.predicateFunction);
    let reduceOutput = joinOutput;
    if(this.reduceFunction) {
      reduceOutput = []
      for(var i = 0; i < joinOutput.length; i ++) {
        reduceOutput.push(this.reduceFunction(...joinOutput[i]))
      }
    }
    return reduceOutput;
  }
}

export default function(a,b) {
  return new Join(a,b);
}
