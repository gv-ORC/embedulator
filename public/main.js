// - - - Emulator Test Start - - -

//TODO: Look into using a code-editor plugin for the textareas, allows color coding of keywords and other things (CodeMirror, AceEditor.. per ChatGPT)
//TODO: Make Breakpoints into a separate array
//TODO: Performance Counter Break Statements
//TODO: Assembler
//TODO: Labels
//TODO: History Buffer
//TODO: History Rollback System
//TODO: Build Stage Tracking system

function Step(em) {
    if (em.fetchedInstruction.startsWith("BREAK")) {
        console.log(`BREAK Detected!`)
        em.falseOperation = true;
        em.currentState.programCounter ++;
        if (em.fetchedInstruction == "BREAK") {
            // Debugger Break
            em.breakFault = true;
            em.stopRequested = true;
        } else {
            // Performance Break
        }
    } else if (!em.falseOperation) {
        const currentInstruction = parseInt(em.fetchedInstruction, 16);
        const opcode = (currentInstruction >> 12) & 0xF;
        const immediate = currentInstruction & 0xFF;
        const registerA = (currentInstruction >> 8) & 0xF;
        const registerB = (currentInstruction >> 4) & 0xF;
        const registerC = currentInstruction & 0xF;
        const returnFlag = (currentInstruction >> 11) & 0x1;
        const callFlag = (currentInstruction >> 10) & 0x1;
        const branchCondition = (currentInstruction >> 8) & 0x7;
        switch (opcode) {
            case 0x0:
                console.log("No Op!");
                // Operation
                em.illegalInstructionFault = false;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x1:
                console.log("Add!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerB] + em.currentState.registerFile[registerC];
                // Flag Generation & Clamping
                em.currentState.flagRegister[0] = (em.currentState.registerFile[registerA] >> 16) & 0xFFFF;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerA] & 0xFFFF;
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x2:
                console.log("Sub!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerB] - em.currentState.registerFile[registerC];
                // Flag Generation & Clamping
                em.currentState.flagRegister[0] = (em.currentState.registerFile[registerA] >> 16) & 0xFFFF;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerA] & 0xFFFF;
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x3:
                console.log("AND!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerB] & em.currentState.registerFile[registerC];
                // Flag Generation & Clamping
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x4:
                console.log("OR!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerB] | em.currentState.registerFile[registerC];
                // Flag Generation & Clamping
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x5:
                console.log("XOR!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerB] ^ em.currentState.registerFile[registerC];
                // Flag Generation & Clamping
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x6:
                console.log("NOT C!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerC] ^ 0xFFFF;
                // Flag Generation & Clamping
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x7:
                console.log("Right Shift!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerC] >> 1;
                // Flag Generation & Clamping
                em.currentState.flagRegister[0] = (em.currentState.registerFile[registerA] >> 16) & 0xFFFF;
                em.currentState.registerFile[registerA] = em.currentState.registerFile[registerA] & 0xFFFF;
                em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                // Increment PC
                em.currentState.programCounter ++;
                break;
            case 0x8:
                {
                    console.log("Load!");
                    // Operation
                    em.illegalInstructionFault = false;
                    const memoryAddress = em.currentState.registerFile[registerC];
                    em.currentState.registerFile[registerA] = em.currentState.ram[memoryAddress];
                    // Flag Generation & Clamping
                    em.currentState.registerFile[registerA] & 0xFFFF;
                    em.currentState.flagRegister[1] = em.currentState.registerFile[registerA] == 0;
                    // Increment PC
                    em.currentState.programCounter ++;
                }
                break;
            case 0x9:
                {
                    console.log("Store!");
                    // Operation
                    em.illegalInstructionFault = false;
                    const memoryAddress = em.currentState.registerFile[registerC];
                    em.currentState.ram[memoryAddress] = em.currentState.registerFile[registerB];
                    // Flag Generation & Clamping
                    em.currentState.ram[memoryAddress] = em.currentState.ram[memoryAddress] & 0xFFFF;
                    // Increment PC
                    em.currentState.programCounter ++;
                }
                break;
            case 0xA:
                console.log("Load Imm!");
                // Operation
                em.illegalInstructionFault = false;
                em.currentState.registerFile[registerA] = immediate;
                // Flag Generation & Clamping
                em.currentState.programCounter ++;
                break;
            case 0xD:
                console.log("Halt!");
                em.illegalInstructionFault = false;
                em.stopRequested = true;
                break;
            case 0xE:
                if (callFlag & returnFlag) {
                    console.log("Illegal Jump, Can Not Both Call and Return!");
                    em.stopRequested = true;
                    em.illegalInstructionFault = true;
                } else if (callFlag) {
                    console.log("Calling!")
                    em.currentState.callStack.push(em.currentState.programCounter);
                    em.currentState.callStack.shift();
                    em.currentState.programCounter = immediate;
                        console.log(em.currentState.callStack)
                } else if (returnFlag) {
                    console.log("Returning!")
                    em.currentState.programCounter = em.currentState.callStack.pop();
                    em.currentState.callStack.unshift(0);
                        console.log(em.currentState.callStack)
                } else {
                    console.log("Jumping!")
                    em.currentState.programCounter = immediate;
                };
                em.illegalInstructionFault = false;
                break;
            case 0xF:
                let branchTaken = false;
                switch (branchCondition) {
                    case 0x1:
                        console.log("Branch If Carry Out!");
                        branchTaken = !!em.currentState.flagRegister[0];
                        break;
                    case 0x2:
                        console.log("Branch If Zero!");
                        branchTaken = !!em.currentState.flagRegister[1];
                        break;
                    case 0x5:
                        console.log("Branch If Not Carry Out!");
                        branchTaken = !em.currentState.flagRegister[0];
                        break;
                    case 0x6:
                        console.log("Branch If Not Zero!");
                        branchTaken = !em.currentState.flagRegister[1];
                        break;
                    default:
                        console.log("Illegal Branch Condition! Instruction: " + em.currentInstruction);
                        em.stopRequested = true;
                        em.illegalInstructionFault = true;
                        branchTaken = false;
                        break;
                }
                if (branchTaken) {
                    console.log("> Branch Taken!");
                    em.currentState.programCounter = immediate;
                } else if (!em.stopRequested) {
                    console.log("> Branch Not Taken!");
                    em.currentState.programCounter ++;
                }
                em.illegalInstructionFault = false;
                break;
            default:
                console.log("Illegal Instruction! Instruction: " + em.currentInstruction);
                em.stopRequested = true;
                em.illegalInstructionFault = true;
                break;
        }
    } else {
        em.illegalInstructionFault = false;
    }
}

function Reset(em){
    em.currentState.programCounter = 0;
    em.currentState.cycleCount = 0;
    em.currentState.callStack = Array(8).fill(0);
    em.currentState.registerFile = Array(16).fill(0);
    em.currentState.flagRegister = Array(2).fill(0);
    em.currentState.ram = Array(65536).fill(0);
    document.getElementById('currentInstructionStatus').textContent = `Current PC and Instruction: Nothing Loaded!`;
}

var initialState = {
    programCounter: 0,
    cycleCount: 0,
    callStack: new Array(8).fill(0),
    registerFile: new Array(16).fill(0),
    flagRegister: new Array(2).fill(0),
    ram: new Array(65536).fill(0)
}

const emulator = createEmulator(Step, Reset, initialState, Assemble);

