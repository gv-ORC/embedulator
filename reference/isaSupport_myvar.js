class InstructionOperand {
    constructor (type, startBit, endBit) {
        this.type = type;
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

class Instruction {
    mnemonic = undefined;
    assembledLength = undefined;
    assemble(program){
        // Some stuff
        return this.internalAssemble(program);
    }
    internalAssemble(program) {
        return [program];
    }
    disassemble(program){
        // Some stuff
        
        return this.internalDisassemble(program)
    }
    internalDisassemble(program) {
        return [program]
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
    internalDisassemble(program) {
        return [this.mnemonic, program.next_line()]
    }
}

class Add_Instruction extends Instruction {
    mnemonic = "add";
    internalAssemble(program) {
        return ["add:", program.next_line()];
    };
    internalDisassemble(program) {
        return ["add:", program.next_line()]
    }
}
const userInput = "class OR_Instruction extends Instruction {\n    mnemonic = \"or\";\n    internalAssemble(program) {\n        return [\"or:\", program.next_line()];\n    };\n    internalDisassemble() {\n        return []\n    }\n}";
const userInstruction = eval ("("+ userInput + ")");

const instructions = [new Generic_Instruction("jal", 1, [], []), new Generic_Instruction("nop", 1, [],[]), new Add_Instruction(), new userInstruction()];
console.log(JSON.stringify(instructions))
// console.log(JSON.parse(JSONinstructions))
const p = new Program(["NOP", "ADD r1 r1 r2", "ADD r2 r1 r2", "OR r3 r2 r1", "jal"]);
while (!p.eof()) {
    instructions.forEach(i => {
        // Try catch this...
        if (p.peek().toLowerCase().startsWith(i.mnemonic)) {
            console.log(i.assemble(p));
        }
    });
}

        // try {
        //     const x = this.internalAssemble();
        //     x[0] ++;
        //     return x;
        // } catch (error) {
        //     console.log("dammmmmmmmmmmm danial ", error);
        //     return ("nah bruh");
        // }