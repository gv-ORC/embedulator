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
