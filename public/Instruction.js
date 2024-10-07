class Instruction {
    mnemonic = undefined;
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
    constructor (type, value, startBit, endBit) {
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

class Generic_Instruction extends Instruction {
    mnemonic = undefined;
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

//* Example of custom instruction that wants to expand the Generic_Instruction function
// class Add_Instruction extends Instruction {
//     mnemonic = "add";
//     assembledLength = 1;
//     internalAssemble(program) {
//         return ["add:", program.next_line()];
//     };
//     internalDisassemble() {
//         return []
//     }
// }