class InstructionAssembly {
    instructionFormat = undefined;
    internalAssemble = undefined;
    internalDisassemble = undefined;
    constructor (instructionFormat, internalAssemble, internalDisassemble) {
        this.instructionFormat = instructionFormat;
        this.internalAssemble = internalAssemble;
        this.internalDisassemble = internalDisassemble;
    }
    assemble(line){
        // Some stuff
        const assembledLine = line;
        return this.internalAssemble(assembledLine);
    }
    disassemble(line){
        // Some stuff
        const disassembledLine = line;
        return this.internalDisassemble(disassembledLine);
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

class Program {
    programCounter = 0;
    lines = [];
    constructor (program) {
        this.lines = program;
    }
    next_line (){
        if (this.programCounter + 1 > this.lines.length) {
            throw "Out of Bounds!"
        }
        return this.lines[this.programCounter++]
    }
    peek (){
        if (this.programCounter > this.lines.length) {
            throw "Out of Bounds!"
        }
        return this.lines[this.programCounter]
    }
    eof (){
        return (this.programCounter > this.lines.length);
    }
}

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
    constructor (mnemonic, instructionAssembly, instructionOperations) {
        this.mnemonic = mnemonic;
        this.instructionAssembly = instructionAssembly;
        this.instructionOperations = instructionOperations;
    }
}

//? Format Definitions
// Operands
const operandA = new InstructionOperand("A", "Dest-Register", undefined, 11, 8);
const operandB = new InstructionOperand("B", "Source-Register", undefined,  7, 4);
const operandC = new InstructionOperand("C", "Source-Register", undefined,  3, 0);
const immediate = new InstructionOperand("Imm", "Immediate", undefined,  7, 0);
// Flags
const jumpFlags = new InstructionOperand("Jump-Flags", "Flag", undefined, 11, 10);
const branchFlags = new InstructionOperand("Branch-Flags", "Flag", undefined, 11, 10);
// Opcode
const majorOpcode = new InstructionOpcode(15, 12);

//? Instruction Formats
// Nop
const nopMachineFormat = new InstructionFormat("nop", 16, majorOpcode, [], [], []);
function assembleNop(line) {
    const assembledLine = line;
    return assembledLine;

}
function disassembleNop(line) {
    const assembledLine = line;
    return assembledLine;
    
}
// Three Operand
const threeOperandMachineFormat = new InstructionFormat("three-operand", 16, majorOpcode, [], [operandB, operandC], [operandA]);
function assembleThreeOperand(line) {
    const assembledLine = line;
    return assembledLine;
    
}
function disassembleThreeOperand(line) {
    const assembledLine = line;
    return assembledLine;
    
}
// Two Operand
const twoOperandMachineFormat = new InstructionFormat("two-operand", 16, majorOpcode, [], [operandC], [operandA]);
function assembleTwoOperand(line) {
    const assembledLine = line;
    return assembledLine;
    
}
function disassembleTwoOperand(line) {
    const assembledLine = line;
    return assembledLine;
    
}
// Store
const storeMachineFormat = new InstructionFormat("store", 16, majorOpcode, [], [operandB], [operandC]);
function assembleStore(line) {
    const assembledLine = line;
    return assembledLine;
    
}
function disassembleStore(line) {
    const assembledLine = line;
    return assembledLine;
    
}
// Immediate
const immediateMachineFormat = new InstructionFormat("immediate", 16, majorOpcode, [], [immediate], [operandA]);
function assembleImmediate(line) {
    const assembledLine = line;
    return assembledLine;

}
function disassembleImmediate(line) {
    const assembledLine = line;
    return assembledLine;

}
// Jump
const jumpMachineFormat = new InstructionFormat("jump", 16, majorOpcode, [jumpFlags], [immediate], []);
function assembleJump(line) {
    const assembledLine = line;
    return assembledLine;

}
function disassembleJump(line) {
    const assembledLine = line;
    return assembledLine;

}
// Branch
const branchMachineFormat = new InstructionFormat("branch", 16, majorOpcode, [branchFlags], [immediate], []);
function assembleBranch(line) {
    const assembledLine = line;
    return assembledLine;

}
function disassembleBranch(line) {
    const assembledLine = line;
    return assembledLine;

}
//? Custom Instruction Type


//? Instructions
//TODO: Setup emulatorState to be where the operands "decode the register address" and fetch the values from the main register file.
// No Operation
const nopAssembly = new InstructionAssembly(nopMachineFormat, assembleNop, disassembleNop);
function nopExecution (instruction, emulatorState) {
    return 0;
}
const nopOperations = new Generic_Operation("stage-0", nopExecution);

// Addition
const addAssembly = new InstructionAssembly(threeOperandMachineFormat, assembleThreeOperand, disassembleThreeOperand);
function addExecution (instruction, emulatorState) {
    return sourceOperands[0] + sourceOperands[1];
}
const addOperations = new Generic_Operation("stage_0", addExecution);

// Subtraction
const subAssembly = new InstructionAssembly(threeOperandMachineFormat, assembleThreeOperand, disassembleThreeOperand);
function subExecution (instruction, emulatorState) {
    return  sourceOperands[0] - sourceOperands[1];
}
const subOperations = new Generic_Operation("stage_0", subExecution);

// AND
const andAssembly = new InstructionAssembly(threeOperandMachineFormat, assembleThreeOperand, disassembleThreeOperand);
function andExecution (instruction, emulatorState) {
    return  sourceOperands[0] & sourceOperands[1];
}
const andOperations = new Generic_Operation("stage_0", andExecution);

// OR
const orAssembly = new InstructionAssembly(threeOperandMachineFormat, assembleThreeOperand, disassembleThreeOperand);
function orExecution (instruction, emulatorState) {
    return  sourceOperands[0] | sourceOperands[1];
}
const orOperations = new Generic_Operation("stage_0", orExecution);

// XOR
const xorAssembly = new InstructionAssembly(threeOperandMachineFormat, assembleThreeOperand, disassembleThreeOperand);
function xorExecution (instruction, emulatorState) {
    return  sourceOperands[0] ^ sourceOperands[1];
}
const xorOperations = new Generic_Operation("stage_0", xorExecution);

// NOT C
const notCAssembly = new InstructionAssembly(twoOperandMachineFormat, assembleTwoOperand, disassembleTwoOperand);
function notCExecution (instruction, emulatorState) {
    return ~sourceOperands[0];
}
const notCOperations = new Generic_Operation("stage_0", notCExecution);

// Right Shift
const rightShiftAssembly = new InstructionAssembly(twoOperandMachineFormat, assembleTwoOperand, disassembleTwoOperand);
function rightShiftExecution (instruction, emulatorState) {
    return sourceOperands[0] >> 1;
}
const rightShiftOperations = new Generic_Operation("stage_0", rightShiftExecution);

// Load
const loadAssembly = new InstructionAssembly(twoOperandMachineFormat, assembleTwoOperand, disassembleTwoOperand);
function loadExecution (instruction, emulatorState) {
    return ram[sourceOperands[0]];
}
const loadOperations = new Generic_Operation("stage_0", loadExecution);

// Store
const storeAssembly = new InstructionAssembly(storeMachineFormat, assembleStore, disassembleStore);
function storeExecution (instruction, emulatorState) {
    return sourceOperands[0]
}
const storeOperations = new Generic_Operation("stage_0", storeExecution);

// Load Immediate
const loadImmediateAssembly = new InstructionAssembly(jumpMachineFormat, assembleImmediate, disassembleImmediate);
function loadImmediateExecution (instruction, emulatorState) {
    // TODO:
}
const loadImmediateOperations = new Generic_Operation("stage_0", loadImmediateExecution);

// Halt
const haltAssembly = new InstructionAssembly(nopMachineFormat, assembleNop, disassembleNop);
function haltExecution (instruction, emulatorState) {
    // TODO:
}
const haltOperations = new Generic_Operation("stage_0", haltExecution);

// Jump
const jumpAssembly = new InstructionAssembly(jumpMachineFormat, assembleJump, disassembleJump);
function jumpExecution (instruction, emulatorState) {
    // TODO:
}
const jumpOperations = new Generic_Operation("stage_0", jumpExecution);

// Branch
const branchAssembly = new InstructionAssembly(branchMachineFormat, assembleBranch, disassembleBranch);
function branchExecution (instruction, emulatorState) {
    // TODO:
}
const branchOperations = new Generic_Operation("stage_0", branchExecution);

// Bringing together the ISA
const nopInstruction = new EmulatedInstruction("nop", nopAssembly, nopOperations);
const additionInstruction = new EmulatedInstruction("add", addAssembly, addOperations);
const subtractionInstruction = new EmulatedInstruction("sub", subAssembly, subOperations);
const andInstruction = new EmulatedInstruction("and", andAssembly, andOperations);
const orInstruction = new EmulatedInstruction("ior", orAssembly, orOperations);
const xorInstruction = new EmulatedInstruction("xor", xorAssembly, xorOperations);
const notCInstruction = new EmulatedInstruction("not", notCAssembly, notCOperations);
const rightShiftInstruction = new EmulatedInstruction("rsh", rightShiftAssembly, rightShiftOperations);
const loadInstruction = new EmulatedInstruction("lod", loadAssembly, loadOperations);
const storeInstruction = new EmulatedInstruction("str", storeAssembly, storeOperations);
const loadImmediateInstruction = new EmulatedInstruction("lim", loadImmediateAssembly, loadImmediateOperations);
const haltInstruction = new EmulatedInstruction("hlt", haltAssembly, haltOperations);
const jumpInstruction = new EmulatedInstruction("jmp", jumpAssembly, jumpOperations);
const branchInstruction = new EmulatedInstruction("brn", branchAssembly, branchOperations);

const instructionSet = [nopInstruction,
                        additionInstruction,
                        subtractionInstruction,
                        andInstruction,
                        orInstruction,
                        xorInstruction,
                        notCInstruction,
                        rightShiftInstruction,
                        loadInstruction,
                        storeInstruction,
                        loadImmediateInstruction,
                        haltInstruction,
                        jumpInstruction,
                        branchInstruction];
console.log(instructionSet);
