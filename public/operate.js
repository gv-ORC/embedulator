class Operations {
    mnemonic = undefined;
    operationList = [];
    constructor (mnemonic, operationList) {
        this.mnemonic = mnemonic;
        this.operationList = operationList;
    }
}

class Generic_Operation {
    stageName = undefined;
    sourceOperands = [];
    destinationQueue = [];
    functionQueue = [];
    constructor (stageName, sourceOperands, destinationQueue, functionQueue) {
        this.stageName = stageName;
        this.sourceOperands = sourceOperands;
        this.destinationQueue = destinationQueue;
        this.functionQueue = functionQueue;
    }
}

const stage2ExecuteAdd = new Generic_Operation("stage2", [], [], []);
const addOperation = new Operations("add", [stage2ExecuteAdd]);
console.log(addOperation);

const stage0FetchBranch = new Generic_Operation("stage0", [], [], []);
const stage1DecodeBranch = new Generic_Operation("stage1", [], [], []);
const stage2ExecuteBranch = new Generic_Operation("stage2", [], [], []);
const branchOperations = new Operations("branch", [stage0FetchBranch, stage1DecodeBranch, stage2ExecuteBranch]);
console.log(branchOperations);
