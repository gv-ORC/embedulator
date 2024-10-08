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
    startBit = undefined;
    endBit = undefined;
    constructor (startBit, endBit) {
        this.startBit = startBit;
        this.endBit = endBit;
    }
}



// This can be used for both machineFormant and assemblyFormat
class InstructionFormat {
    mnemonic = undefined;
    assembledLength = undefined;
    opcode = undefined;
    // Minor Opcodes can be put into flags
    flags = [];
    sourceOperands = [];
    destOperands = [];
    constructor (mnemonic, assembledLength, opcode, flags, sourceOperands, destOperands) {
        this.mnemonic = mnemonic;
        this.assembledLength = assembledLength;
        this.opcode = opcode;
        this.flags = flags;
        this.sourceOperands = sourceOperands;
        this.destOperands = destOperands;
    }
}

class Generic_InstructionAssembly extends InstructionAssembly {
    machineFormat = [];
    assemblyFormat = [];
    constructor (mnemonic, assembledLength, mf, af) {
        super ();
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


//
const operandA = new InstructionOperand("A", "Dest-Register", undefined, 11, 8);
const operandB = new InstructionOperand("B", "Source-Register", undefined,  7, 4);
const operandC = new InstructionOperand("C", "Source-Register", undefined,  3, 0);
const immediate = new InstructionOperand("Imm", "Immediate", undefined,  7, 0);

// Flags
const jumpFlags = new InstructionOperand("Jump-Flags", "Flag", undefined, 11, 10);
const branchFlags = new InstructionOperand("Branch-Flags", "Flag", undefined, 11, 10);

// Opcode
const majorOpcode = new InstructionOpcode(15, 12);

// Instruction Formats
const nopMachineFormat = new InstructionFormat("nop", 16, majorOpcode, [], [], []);
const immediateMachineFormat = new InstructionFormat("immediate", 16, majorOpcode, [], [immediate], [operandA]);
const threeOperandMachineFormat = new InstructionFormat("three-operand", 16, majorOpcode, [], [operandB, operandC], [operandA]);
const twoOperandMachineFormat = new InstructionFormat("two-operand", 16, majorOpcode, [], [operandC], [operandA]);
const storeMachineFormat = new InstructionFormat("store", 16, majorOpcode, [], [operandB], [operandC]);
const jumpMachineFormat = new InstructionFormat("jump", 16, majorOpcode, [jumpFlags], [immediate], []);
const branchMachineFormat = new InstructionFormat("branch", 16, majorOpcode, [branchFlags], [immediate], []);

//? Instructions
//TODO: Setup emulatorState to be where the operands "decode the register address" and fetch the values from the main register file.
// No Operation
const nopAssembly = new Generic_InstructionAssembly(nopMachineFormat, []);
function nopExecution (sourceOperands, emulatorState) {
    return 0;
}
const nopOperations = new Generic_Operation("stage-0", nopExecution);

// Addition
const addAssembly = new Generic_InstructionAssembly(threeOperandMachineFormat, []);
function addExecution (sourceOperands, emulatorState) {
    return sourceOperands[0] + sourceOperands[1];
}
const addOperations = new Generic_Operation("stage_0", addExecution);

// Subtraction
const subAssembly = new Generic_InstructionAssembly(threeOperandMachineFormat, []);
function subExecution (sourceOperands, emulatorState) {
    return  sourceOperands[0] - sourceOperands[1];
}
const subOperations = new Generic_Operation("stage_0", subExecution);

// AND
const andAssembly = new Generic_InstructionAssembly(threeOperandMachineFormat, []);
function andExecution (sourceOperands, emulatorState) {
    return  sourceOperands[0] & sourceOperands[1];
}
const andOperations = new Generic_Operation("stage_0", andExecution);

// OR
const orAssembly = new Generic_InstructionAssembly(threeOperandMachineFormat, []);
function orExecution (sourceOperands, emulatorState) {
    return  sourceOperands[0] | sourceOperands[1];
}
const orOperations = new Generic_Operation("stage_0", orExecution);

// XOR
const xorAssembly = new Generic_InstructionAssembly(threeOperandMachineFormat, []);
function xorExecution (sourceOperands, emulatorState) {
    return  sourceOperands[0] ^ sourceOperands[1];
}
const xorOperations = new Generic_Operation("stage_0", xorExecution);

// NOT C
const notAssembly = new Generic_InstructionAssembly(twoOperandMachineFormat, []);
function notExecution (sourceOperands, emulatorState) {
    return ~sourceOperands[0];
}
const notOperations = new Generic_Operation("stage_0", notExecution);

// Right Shift
const rightShiftAssembly = new Generic_InstructionAssembly(twoOperandMachineFormat, []);
function rightShiftExecution (sourceOperands, emulatorState) {
    return sourceOperands[0] >> 1;
}
const rightShiftOperations = new Generic_Operation("stage_0", rightShiftExecution);

// Load
const loadAssembly = new Generic_InstructionAssembly(twoOperandMachineFormat, []);
function loadExecution (sourceOperands, emulatorState) {
    return ram[sourceOperands[0]];
}
const loadOperations = new Generic_Operation("stage_0", loadExecution);

// Store
const storeAssembly = new Generic_InstructionAssembly(storeMachineFormat, []);
function storeExecution (sourceOperands, emulatorState) {
    return sourceOperands[0]
}

// Jump
const jumpAssembly = new Generic_InstructionAssembly(jumpMachineFormat, []);
function jumpExecution (sourceOperands, flags, currentProgramCounter) {
    // TODO:
}

// Branch
const branchAssembly = new Generic_InstructionAssembly(branchMachineFormat, []);
function branchExecution (sourceOperands, flags, emulatorState) {
    // TODO:
}
const branchOperations = new Generic_Operation("stage_0", branchExecution);

// Bringing together the ISA
const noOperationInstruction = new EmulatedInstruction("nop", nopAssembly, nopOperations);
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
