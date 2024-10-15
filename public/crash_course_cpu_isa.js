//? Format Elements
// Operands
const operandA = new InstructionOperand(undefined, 1, 1, 11, 8);
const operandB = new InstructionOperand(undefined, 2,  1, 7, 4);
const operandC = new InstructionOperand(undefined, 3,  1, 3, 0);
const immediate = new InstructionOperand(undefined, 2, 1, 7, 0);
const jumpBranchDestination = new InstructionOperand(undefined, 1, 1, 7, 0);
// Flags
const jumpFlags = new InstructionOperand(undefined, 0, 11, 10);
const branchFlags = new InstructionOperand(undefined, 0, 11, 10);
//? Instruction Formats
// Nop
class AssembledNopFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("nop", 16, 1, [opcode], [], [], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
}
// Three Operand
class AssembledThreeOperandFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("three-operand", 16, 1, [opcode], [], [operandB, operandC], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
}
// Two Operand
class AssembledTwoOperandFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("two-operand", 16, 1, [opcode], [], [operandC], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
}
// Store
class AssembledStoreFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("store", 16, 1, [opcode], [], [operandB], [operandC]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    userAssemble(line) {
        //! Replace 
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    userDisassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Immediate
class AssembledImmediateFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("immediate", 16, 1, [opcode], [], [immediate], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    userAssemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    userDisassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Halt
class AssembledImmediateFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("halt", 16, 1, [opcode], [], [], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    userAssemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    userDisassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Jump
class AssembledJumpFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("jump", 16, 1, [opcodeFormat], [jumpFlags], [jumpBranchDestination], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    userAssemble(line) {
        //! Flags that are generated implicitly based on Assembly Mnemonic must be managed here
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    userDisassemble(line) {
        //! Flags that are generated implicitly based on Assembly Mnemonic must be managed here
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Branch
class AssembledBranchFormat extends InstructionAssembly {
    constructor(hexValue) {
        const opcode = new InstructionOpcode(hexValue, 15, 12);
        const instructionFormat = new InstructionFormat("branch", 16, 1, [opcode], [branchFlags], [jumpBranchDestination], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    userAssemble(line) {
        //! Flags that are generated implicitly based on Assembly Mnemonic must be managed here
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    userDisassemble(line) {
        //! Flags that are generated implicitly based on Assembly Mnemonic must be managed here
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}

//? Instructions
// No Operation
const nopOperations = {
    "stage_0": function nopExecute(instruction, emulator) {
        emulator.Program.programCounter ++
        return 0;
    }
}
const nopInstruction = new InstructionDefinition("nop", new AssembledNopFormat(0x0), nopOperations);

// Addition
const addOperations = {
    "stage_0": function addExecute(instruction, emulator) {
        const sourceBAddress = BigInt(instruction.sourceOperands[0].value);
        const sourceCAddress = BigInt(instruction.sourceOperands[1].value);
        const result = BigInt(emulator.currentState.registerFile[sourceBAddress] + emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const additionInstruction = new InstructionDefinition("add", new AssembledThreeOperandFormat(0x1), addOperations);

// Subtraction
const subOperations = {
    "stage_0": function subExecute(instruction, emulator) {
        const sourceBAddress = BigInt(instruction.sourceOperands[0].value);
        const sourceCAddress = BigInt(instruction.sourceOperands[1].value);
        const result = BigInt(emulator.currentState.registerFile[sourceBAddress] - emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const subtractionInstruction = new InstructionDefinition("sub", new AssembledThreeOperandFormat(0x2), subOperations);

// AND
const andOperations = {
    "stage_0":function andExecute(instruction, emulator) {
        const sourceBAddress = BigInt(instruction.sourceOperands[0].value);
        const sourceCAddress = BigInt(instruction.sourceOperands[1].value);
        const result = BigInt(emulator.currentState.registerFile[sourceBAddress] & emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const andInstruction = new InstructionDefinition("and", new AssembledThreeOperandFormat(0x3), andOperations);

// OR
const orOperations = {
    "stage_0": function orExecute(instruction, emulator) {
        const sourceBAddress = BigInt(instruction.sourceOperands[0].value);
        const sourceCAddress = BigInt(instruction.sourceOperands[1].value);
        const result = BigInt(emulator.currentState.registerFile[sourceBAddress] | emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const orInstruction = new InstructionDefinition("ior", new AssembledThreeOperandFormat(0x4), orOperations);

// XOR
const xorOperations = {
    "stage_0": function xorExecute(instruction, emulator) {
        const sourceBAddress = BigInt(instruction.sourceOperands[0].value);
        const sourceCAddress = BigInt(instruction.sourceOperands[1].value);
        const result = BigInt(emulator.currentState.registerFile[sourceBAddress] ^ emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const xorInstruction = new InstructionDefinition("xor", new AssembledThreeOperandFormat(0x5), xorOperations);

// NOT C
const notCOperations = {
    "stage_0": function notCExecute(instruction, emulator) {
        const sourceCAddress = BigInt(instruction.sourceOperands[0].value);
        const result = BigInt(~emulator.currentState.registerFile[sourceCAddress]);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const notCInstruction = new InstructionDefinition("not", new AssembledTwoOperandFormat(0x6), notCOperations);

// Right Shift
const rightShiftOperations = {
    "stage_0": function rightShiftExecute(instruction, emulator) {
        const sourceCAddress = BigInt(instruction.sourceOperands[0].value);
        const result = BigInt(emulator.currentState.registerFile[sourceCAddress] >> 1);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const rightShiftInstruction = new InstructionDefinition("rsh", new AssembledTwoOperandFormat(0x7), rightShiftOperations);

// Load
const loadOperations = {
    "stage_0": function loadExecute(instruction, emulator) {
        //todo:
    }
}
const loadInstruction = new InstructionDefinition("lod", new AssembledTwoOperandFormat(0x8), loadOperations);

// Store
const storeOperations = {
    "stage_0": function storeExecute(instruction, emulator) {
        //todo:
    }
}
const storeInstruction = new InstructionDefinition("str", new AssembledStoreFormat(0x9), storeOperations);

// Load Immediate
const loadImmediateOperations = {
    "stage_0": function loadImmediateExecute(instruction, emulator) {
        const immediate = BigInt(instruction.sourceOperands[0].value);
        const result = BigInt(immediate);
        const destinationAddress = BigInt(instruction.destOperands[0].value);
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const loadImmediateInstruction = new InstructionDefinition("lim", [], new AssembledImmediateFormat(0xA), loadImmediateOperations);

// Halt
const haltOperations = {
    "stage_0": function haltExecute(instruction, emulator) {
        //todo:
    }
}
const haltInstruction = new InstructionDefinition("hlt", [], new AssembledNopFormat(0xD), haltOperations);

// Jumps
const jumpOperations = {
    "stage_0": function jumpExecute(instruction, emulator) {
        //todo:
    }
}
const jumpInstruction = new InstructionDefinition("jmp", new AssembledJumpFormat(0xE), jumpOperations);
const callInstruction = new InstructionDefinition("cal", new AssembledJumpFormat(0xE), jumpOperations);
const returnInstruction = new InstructionDefinition("ret", new AssembledJumpFormat(0xE), jumpOperations);

// Branches
const branchOperations = {
    "stage_0": function branchExecute(instruction, emulator) {
        //todo:
    }
}
const branchIfCarryInstruction = new InstructionDefinition("brc", new AssembledBranchFormat(0xF), branchOperations);
const branchIfNotCarryInstruction = new InstructionDefinition("bnc", new AssembledBranchFormat(0xF), branchOperations);
const branchIfZeroInstruction = new InstructionDefinition("brz", new AssembledBranchFormat(0xF), branchOperations);
const branchIfNotZeroInstruction = new InstructionDefinition("bnz", new AssembledBranchFormat(0xF), branchOperations);

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
                        callInstruction,
                        returnInstruction,
                        branchIfCarryInstruction,
                        branchIfNotCarryInstruction,
                        branchIfZeroInstruction,
                        branchIfNotZeroInstruction,
                       ];

const assembledAddition = instructionSet[1].instructionAssembly._InternalAssemble("add r1 r1 r2");
console.log("Assembled Addition: ", assembledAddition);

const executedInstruction = instructionSet[1].instructionAssembly.getFormat();
console.log("Addition Source Operands: ", executedInstruction.sourceOperands);

console.log("Addition Execution Function: \n" + instructionSet[1].instructionOperations["stage_0"]);
