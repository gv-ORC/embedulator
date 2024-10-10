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

//                                                                           //

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
    value = undefined;
    startBit = undefined;
    endBit = undefined;
    constructor (mnemonic, value, startBit, endBit) {
        this.mnemonic = mnemonic;
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

class InstructionDefinition {
    mnemonic = undefined;
    instructionAssembly = undefined;
    instructionOperations = {};
    constructor (mnemonic, instructionAssembly, instructionOperations) {
        this.mnemonic = mnemonic;
        this.instructionAssembly = instructionAssembly;
        this.instructionOperations = instructionOperations;
    }
}

//                                                                           //

//? Format Definitions
// Operands
const operandA = new InstructionOperand("A", undefined, 11, 8);
const operandB = new InstructionOperand("B", undefined,  7, 4);
const operandC = new InstructionOperand("C", undefined,  3, 0);
const immediate = new InstructionOperand("Imm", undefined,  7, 0);
// Flags
const jumpFlags = new InstructionOperand("Jump-Flags", undefined, 11, 10);
const branchFlags = new InstructionOperand("Branch-Flags", undefined, 11, 10);
// Opcode
const majorOpcode = new InstructionOpcode(15, 12);
//? Instruction Formats
// Nop
class AssembledNopFormat {
    instructionFormat = new InstructionFormat("nop", 16, majorOpcode, [], [], []);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Three Operand
class AssembledThreeOperandFormat {
    instructionFormat = new InstructionFormat("three-operand", 16, majorOpcode, [], [operandB, operandC], [operandA]);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Two Operand
class AssembledTwoOperandFormat {
    instructionFormat = new InstructionFormat("two-operand", 16, majorOpcode, [], [operandC], [operandA]);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Store
class AssembledStoreFormat {
    instructionFormat = new InstructionFormat("store", 16, majorOpcode, [], [operandB], [operandC]);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Immediate
class AssembledImmediateFormat {
    instructionFormat = new InstructionFormat("immediate", 16, majorOpcode, [], [immediate], [operandA]);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Jump
class AssembledJumpFormat {
    instructionFormat = new InstructionFormat("jump", 16, majorOpcode, [jumpFlags], [immediate], []);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
// Branch
class AssembledBranchFormat {
    instructionFormat = new InstructionFormat("branch", 16, majorOpcode, [branchFlags], [immediate], []);
    constructor() {
        this.instructionAssembly = new InstructionAssembly(
            this.instructionFormat,
            this.assemble.bind(this),
            this.disassemble.bind(this));
    }
    assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;  
    }
}
//? Custom Instruction Type


//? Instructions
// No Operation
const nopOperations = {
    "stage_0": function nopExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const nopInstruction = new InstructionDefinition("nop", AssembledNopFormat, nopOperations);

// Addition
const addOperations = {
    "stage_0": function addExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const additionInstruction = new InstructionDefinition("add", AssembledThreeOperandFormat, addOperations);

// Subtraction
const subOperations = {
    "stage_0": function subExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const subtractionInstruction = new InstructionDefinition("sub", AssembledThreeOperandFormat, subOperations);

// AND
const andOperations = {
    "stage_0":function andExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const andInstruction = new InstructionDefinition("and", AssembledThreeOperandFormat, andOperations);

// OR
const orOperations = {
    "stage_0": function orExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const orInstruction = new InstructionDefinition("ior", AssembledThreeOperandFormat, orOperations);

// XOR
const xorOperations = {
    "stage_0": function xorExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const xorInstruction = new InstructionDefinition("xor", AssembledThreeOperandFormat, xorOperations);

// NOT C
const notCOperations = {
    "stage_0": function notCExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const notCInstruction = new InstructionDefinition("not", AssembledTwoOperandFormat, notCOperations);

// Right Shift
const rightShiftOperations = {
    "stage_0": function rightShiftExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const rightShiftInstruction = new InstructionDefinition("rsh", AssembledTwoOperandFormat, rightShiftOperations);

// Load
const loadOperations = {
    "stage_0": function loadExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const loadInstruction = new InstructionDefinition("lod", AssembledTwoOperandFormat, loadOperations);

// Store
const storeOperations = {
    "stage_0": function storeExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const storeInstruction = new InstructionDefinition("str", AssembledStoreFormat, storeOperations);

// Load Immediate
const loadImmediateOperations = {
    "stage_0": function loadImmediateExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const loadImmediateInstruction = new InstructionDefinition("lim", AssembledImmediateFormat, loadImmediateOperations);

// Halt
const haltOperations = {
    "stage_0": function haltExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const haltInstruction = new InstructionDefinition("hlt", AssembledNopFormat, haltOperations);

// Jump
const jumpOperations = {
    "stage_0": function jumpExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const jumpInstruction = new InstructionDefinition("jmp", AssembledJumpFormat, jumpOperations);

// Branch
const branchOperations = {
    "stage_0": function branchExecute(instruction, emulatorState) {
        // Code that gets executed for this instruction
    }
}
const branchInstruction = new InstructionDefinition("brn", AssembledBranchFormat, branchOperations);

//? Array of all defined instructions
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
