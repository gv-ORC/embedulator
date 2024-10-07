class InstructionAssembly {
    assembledLength = undefined;
    assemble(program){
        // Some stuff
        return this.internalAssemble(program);
    }
    internalAssemble(program) {
        return program;
    }
    disassemble(program){
        // Some stuff
        return this.internalDisassemble(program)
    }
    internalDisassemble(program) {
        return program
    }
}

class InstructionOperand {
    mnemonic = undefined;
    type = undefined;
    value = undefined;
    startBit = undefined;
    endBit = undefined;
    constructor (mnemonic, type, value, startBit, endBit) {
        this.mnemonic = mnemonic;
        this.type = type;
        this.value = value;
        this.startBit = startBit;
        this.endBit = endBit;
    }
}

class InstructionOpcode {
    // flags can use the operand struct
    constructor (mnemonic, flags, startBit, endBit) {
        this.mnemonic = mnemonic;
        this.flags = flags;
        this.startBit = startBit;
        this.endBit = endBit;
    }
}

class Generic_InstructionAssembly extends InstructionAssembly {
    assembledLength = undefined;
    machineFormat = [];
    assemblyFormat = [];
    constructor (mnemonic, assembledLength, mf, af) {
        super ();
        this.assembledLength = assembledLength;
        this.mnemonic = mnemonic;
        this.machineFormat = mf;
        this.assemblyFormat = af;
    }
    internalAssemble(program) {
        return [this.mnemonic, program.next_line()];
    };
    internalDisassemble() {
        return []
    }
}

class Program {
    index = 0;
    lines = [];
    constructor (program) {
        this.lines = program;
    }
    next_line (){
        if (this.index + 1 > this.lines.length) {
            throw "Out of Bounds!"
        }
        return this.lines[this.index++]
    }
    peek (){
        if (this.index > this.lines.length) {
            throw "Out of Bounds!"
        }
        return this.lines[this.index]
    }
    eof (){
        return (this.index > this.lines.length);
    }
}

//* Example of custom instruction that wants to expand the Generic_Instruction function
// class Add_Instruction extends InstructionAssembly {
//     mnemonic = "add";
//     assembledLength = 1;
//     internalAssemble(program) {
//         return ["add:", program.next_line()];
//     };
//     internalDisassemble() {
//         return []
//     }
// }

class Generic_Operation {
    stageName = undefined;
    functionQueue = [];
    constructor (stageName, functionQueue) {
        this.stageName = stageName;
        this.functionQueue = functionQueue;
    }
}

class EmulatedInstruction {
    mnemonic = undefined;
    instructionAssembly = undefined;
    instructionOperations = [];
}



const OperandA = new InstructionOperand("A", "dest-reg", undefined, 11, 8);
const OperandB = new InstructionOperand("B", "source-reg", undefined,  7, 4);
const OperandC = new InstructionOperand("C", "source-reg", undefined,  3, 0);
const Immediate = new InstructionOperand("Imm", "immediate", undefined,  7, 0);

// No Operation
const nopOpcode = new InstructionOpcode("nop", [], 15, 12);
function nopExecution () {
    return 0;
}
const nopAssembly = new Generic_InstructionAssembly(16, nopOpcode, [], []);
const nopOperations = new Generic_Operation("stage-0", nopExecution);

// Addition
const addOpcode = new InstructionOpcode("add", [], 15, 12);
function addExecution (input0, input1) {
    return result = input0 + input1;
}
const addAssembly = new Generic_InstructionAssembly(16, addOpcode, [OperandA, OperandB, OperandC], []);
const addOperations = new Generic_Operation("stage_0", addExecution);

// Subtraction
const subOpcode = new InstructionOpcode("sub", [], 15, 12);
function subExecution (input0, input1) {
    return input0 - input1;
}
const subAssembly = new Generic_InstructionAssembly(16, [subOpcode, OperandA, OperandB, OperandC], []);
const subOperations = new Generic_Operation("stage_0", subExecution);

// Brining together the ISA
const nopInstruction = new EmulatedInstruction("nop", nopAssembly, nopOperations);
const additionInstruction = new EmulatedInstruction("add", addAssembly, addOperations);
const subtractionInstruction = new EmulatedInstruction("sub", subAssembly, subOperations);
const instructionSet = [nopInstruction, additionInstruction, subtractionInstruction];


// class Generic_Operation {
    // stageName = undefined;
    // sourceOperands = [];
    // destinationQueue = [];
    // functionQueue = [];
    // constructor (stageName, sourceOperands, destinationQueue, functionQueue) {
    // constructor (stageName, functionQueue) {
        // this.stageName = stageName;
        // this.sourceOperands = sourceOperands;
        // this.destinationQueue = destinationQueue;
        // this.functionQueue = functionQueue;
    // }
// }

// const stage2ExecuteAdd = new Generic_Operation("stage2", [], [], []);
// const addOperation = new Operations("add", [stage2ExecuteAdd]);
// console.log(addOperation);

// const stage0FetchBranch = new Generic_Operation("stage0", [], [], []);
// const stage1DecodeBranch = new Generic_Operation("stage1", [], [], []);
// const stage2ExecuteBranch = new Generic_Operation("stage2", [], [], []);
// const branchOperations = new Operations("branch", [stage0FetchBranch, stage1DecodeBranch, stage2ExecuteBranch]);
// console.log(branchOperations);
