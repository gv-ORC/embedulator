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

class Emulator {

    // on each step, run a list of stages by name in reverse order... starting with the history buffer updates first
    // If no definition of that stages given function are found for a particular instruction, run the defined default function for that stage.
    
}

class Assembler {

}