import hashJoin from '../src/join/hashJoin';
import nestedLoopJoin from '../src/join/nestedLoopJoin';
import sortMergeJoin from '../src/join/sortMergeJoin';
import joinBench from './util/joinBench';

export default joinBench('Full Outer Joins Small', 10,
    hashJoin, sortMergeJoin, nestedLoopJoin);
