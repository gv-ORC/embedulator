

//? Format Elements
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
class AssembledNopFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("nop", 16, majorOpcode, [], [], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Three Operand
class AssembledThreeOperandFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("three-operand", 16, majorOpcode, [], [operandB, operandC], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Two Operand
class AssembledTwoOperandFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("two-operand", 16, majorOpcode, [], [operandC], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Store
class AssembledStoreFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("store", 16, majorOpcode, [], [operandB], [operandC]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Immediate
class AssembledImmediateFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("immediate", 16, majorOpcode, [], [immediate], [operandA]);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Jump
class AssembledJumpFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("jump", 16, majorOpcode, [jumpFlags], [immediate], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
        // Custom Disassembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
}
// Branch
class AssembledBranchFormat extends InstructionAssembly {
    constructor() {
        const instructionFormat = new InstructionFormat("branch", 16, majorOpcode, [branchFlags], [immediate], []);
        super(instructionFormat);
        this.instructionFormat = instructionFormat;
    }
    Assemble(line) {
        // Custom Assembly Code Here
        const assembledLine = line;
        return assembledLine;
    }
    Disassemble(line) {
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
const nopInstruction = new InstructionDefinition("nop", AssembledNopFormat, nopOperations);

// Addition
const addOperations = {
    "stage_0": function addExecute(instruction, emulator) {
        const sourceBAddress = instruction.sourceOperands[0].value
        const sourceCAddress = instruction.sourceOperands[1].value
        const result = emulator.currentState.registerFile[sourceBAddress] + emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const additionInstruction = new InstructionDefinition("add", AssembledThreeOperandFormat, addOperations);

// Subtraction
const subOperations = {
    "stage_0": function subExecute(instruction, emulator) {
        const sourceBAddress = instruction.sourceOperands[0].value
        const sourceCAddress = instruction.sourceOperands[1].value
        const result = emulator.currentState.registerFile[sourceBAddress] - emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const subtractionInstruction = new InstructionDefinition("sub", AssembledThreeOperandFormat, subOperations);

// AND
const andOperations = {
    "stage_0":function andExecute(instruction, emulator) {
        const sourceBAddress = instruction.sourceOperands[0].value
        const sourceCAddress = instruction.sourceOperands[1].value
        const result = emulator.currentState.registerFile[sourceBAddress] & emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const andInstruction = new InstructionDefinition("and", AssembledThreeOperandFormat, andOperations);

// OR
const orOperations = {
    "stage_0": function orExecute(instruction, emulator) {
        const sourceBAddress = instruction.sourceOperands[0].value
        const sourceCAddress = instruction.sourceOperands[1].value
        const result = emulator.currentState.registerFile[sourceBAddress] | emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const orInstruction = new InstructionDefinition("ior", AssembledThreeOperandFormat, orOperations);

// XOR
const xorOperations = {
    "stage_0": function xorExecute(instruction, emulator) {
        const sourceBAddress = instruction.sourceOperands[0].value
        const sourceCAddress = instruction.sourceOperands[1].value
        const result = emulator.currentState.registerFile[sourceBAddress] ^ emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const xorInstruction = new InstructionDefinition("xor", AssembledThreeOperandFormat, xorOperations);

// NOT C
const notCOperations = {
    "stage_0": function notCExecute(instruction, emulator) {
        const sourceCAddress = instruction.sourceOperands[0].value
        const result = !emulator.currentState.registerFile[sourceCAddress];
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const notCInstruction = new InstructionDefinition("not", AssembledTwoOperandFormat, notCOperations);

// Right Shift
const rightShiftOperations = {
    "stage_0": function rightShiftExecute(instruction, emulator) {
        const sourceCAddress = instruction.sourceOperands[0].value
        const result = emulator.currentState.registerFile[sourceCAddress] >> 1;
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const rightShiftInstruction = new InstructionDefinition("rsh", AssembledTwoOperandFormat, rightShiftOperations);

// Load
const loadOperations = {
    "stage_0": function loadExecute(instruction, emulator) {
        //todo:
    }
}
const loadInstruction = new InstructionDefinition("lod", AssembledTwoOperandFormat, loadOperations);

// Store
const storeOperations = {
    "stage_0": function storeExecute(instruction, emulator) {
        //todo:
    }
}
const storeInstruction = new InstructionDefinition("str", AssembledStoreFormat, storeOperations);

// Load Immediate
const loadImmediateOperations = {
    "stage_0": function loadImmediateExecute(instruction, emulator) {
        const immediate = instruction.sourceOperands[0].value;
        const result = immediate;
        const destinationAddress = instruction.destOperands[0].value;
        emulator.currentState.registerFile[destinationAddress] = result;

        emulator.Program.programCounter ++
    }
}
const loadImmediateInstruction = new InstructionDefinition("lim", AssembledImmediateFormat, loadImmediateOperations);

// Halt
const haltOperations = {
    "stage_0": function haltExecute(instruction, emulator) {
        //todo:
    }
}
const haltInstruction = new InstructionDefinition("hlt", AssembledNopFormat, haltOperations);

// Jump
const jumpOperations = {
    "stage_0": function jumpExecute(instruction, emulator) {
        //todo:
    }
}
const jumpInstruction = new InstructionDefinition("jmp", AssembledJumpFormat, jumpOperations);

// Branch
const branchOperations = {
    "stage_0": function branchExecute(instruction, emulator) {
        //todo:
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
                        branchInstruction
                       ];

const assembledAddition = instructionSet[1].instructionAssembly._InternalAssemble("add r1 r1 r2");
console.log("Assembled Addition: ", assembledAddition);

const executedInstruction = instructionSet[1].instructionAssembly.getFormat();
console.log("Addition Source Operands: ", executedInstruction.sourceOperands);

console.log("Addition Execution Function: \n" + instructionSet[1].instructionOperations["stage_0"]);
