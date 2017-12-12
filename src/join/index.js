import nljoin from './nestedLoopJoin';

class Join {
  constructor (left, right) {
    this.left = left;
    this.right = right;
    this.leftKeyFunction = this._defaultKeyFunction;
    this.rightKeyFunction = this._defaultKeyFunction;
    this.predicateFunction = this._defaultPredicateFunction;
    this.reduceFunction = this._defaultReduceFunction;
    this.joinFunction = nljoin;
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

  _defaultKeyFunction (x) {
    return x;
  }

  _defaultPredicateFunction (a, b) {
    return a === b;
  }

  _defaultReduceFunction (a, b) {
    return [a, b];
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
    return this.joinFunction(this.left, this.leftKeyFunction, this.right, this.rightKeyFunction, this.predicateFunction, this.reduceFunction);
  }
}

export default function(a,b) {
  return new Join(a,b);
}
