import hashJoin from '../src/join/hashJoin';
import nestedLoopJoin from '../src/join/nestedLoopJoin';
import sortMergeJoin from '../src/join/sortMergeJoin';
import joinBench from './util/joinBench';

export default joinBench('Full Outer Joins Large', 1000,
    hashJoin, sortMergeJoin, nestedLoopJoin);
