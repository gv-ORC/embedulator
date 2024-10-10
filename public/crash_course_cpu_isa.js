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
class AssembledNopFormat extends InstructionAssembly {
    instructionFormat = new InstructionFormat("nop", 16, majorOpcode, [], [], []);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("three-operand", 16, majorOpcode, [], [operandB, operandC], [operandA]);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("two-operand", 16, majorOpcode, [], [operandC], [operandA]);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("store", 16, majorOpcode, [], [operandB], [operandC]);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("immediate", 16, majorOpcode, [], [immediate], [operandA]);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("jump", 16, majorOpcode, [jumpFlags], [immediate], []);
    constructor(instructionFormat) {
        super(instructionFormat);
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
    instructionFormat = new InstructionFormat("branch", 16, majorOpcode, [branchFlags], [immediate], []);
    constructor(instructionFormat) {
        super(instructionFormat);
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
