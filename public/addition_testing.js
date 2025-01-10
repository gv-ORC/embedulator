class InstructionAssembly {
    instructionFormat = undefined;
    _InternalAssemble(line){
        // ToDo
        const preAssembledLine = line;
        return this.Assemble(preAssembledLine);
    }
    // `internalAssemble` Will be overridden by the user config
    Assemble(program) {
        return [program];
    }
    _InternalDisassemble(line){
        // ToDo
        const preDisassembledLine = line;
        return this.Disassemble(preDisassembledLine);
    }
    // `internalDisassemble` Will be overridden by the user config
    Disassemble(program) {
        return [program]
    }
    getFormat() {
        return this.instructionFormat;
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
        this.instructionAssembly = new instructionAssembly();
        this.instructionOperations = instructionOperations;
    }
}



const operandA = new InstructionOperand("A", undefined, 11, 8);
const operandB = new InstructionOperand("B", undefined,  7, 4);
const operandC = new InstructionOperand("C", undefined,  3, 0);
const immediate = new InstructionOperand("Imm", undefined,  7, 0);
// Flags
const jumpFlags = new InstructionOperand("Jump-Flags", undefined, 11, 10);
const branchFlags = new InstructionOperand("Branch-Flags", undefined, 11, 10);
// Opcode
const majorOpcode = new InstructionOpcode(15, 12);



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




const addOperations = {
    "stage_0": function addExecute(instruction, emulator) {
        // Some Code here
    }
}
const additionInstruction = new InstructionDefinition("add", AssembledThreeOperandFormat, addOperations);




const executionFormat = additionInstruction.instructionAssembly.getFormat();
// const testInt = BigInt(executionFormat.opcode.startBit);
const testInt = BigInt(63 >> 1);
// console.log(executionFormat.destOperands[0]);

// const testInput = 32;
// const testInt = BigInt("0b1111111111111111111111111111111111111111111111111111111111111111");
// const testInt = BigInt(testInput);
// const testInt = BigInt("0xFFFFFFFFFFFFFFFF");
// console.log(testInt);

const testString = "ADD r1 r1 r2"
const splitTest = testString.split(" ");
// console.log(splitTest);

const testArray = [];
if (testArray.length == 0) {
    console.log("Zero Length!");
} else {
    console.log("Array Has Contents");
}

// function extractBinaryValue(instruction, startBit, endBit) {
//     const maskWidth = startBit - endBit;
//     const shiftedMask = 0xFFFF << maskWidth;
//     const valueMask = !shiftedMask;

//     const shiftedInstruction = instruction >> maskWidth;

//     return value= shiftedInstruction & valueMask;
// }
