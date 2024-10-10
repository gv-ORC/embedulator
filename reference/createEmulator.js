function createEmulator(stepFunction, resetFunction, initialState, assembleFunction, ...internalState) {
    return {
        // Public
        StepRate: 50,
        currentState: initialState,
        fetchedInstruction: "Nothing Loaded!",
        codeInAssembly: false,
        stopRequested: false,
        illegalInstructionFault: false,
        breakFault: false,
        falseOperation: false,
        // Private
        isRunning: false,
        resetRequested: false,
        


        // - Assembler Function -
        toggleCodeType () {
            currentCodeType = document.getElementById("CodeTypeToggle");
            if (this.codeInAssembly) {
                this.codeInAssembly = false;
                document.getElementById("CodeTypeToggle").textContent = "( * Code In Hex * )"
            } else {
                this.codeInAssembly = true;
                document.getElementById("CodeTypeToggle").textContent = "( * Code In Assembly * )"
            }
        },

        safeAssemble () {
            if (this.isRunning) {
                console.log("Can Not Assemble! Emulator Running!")
            } else {
                // const uncommentedProgram = this.removeComments(document.getElementById("userProgram").value);
                const uncommentedProgram = this.removeComments(editor.getValue());
                console.log(uncommentedProgram);
                // splitProgram = inputProgram.split(`\n`);
                let assembledProgram = this.extractBreakPoints(uncommentedProgram);
                assembleFunction(assembledProgram, this);
                this.stopRequested = false; 
            }
        },

        removeComments (inputProgram) {
            // Whole Commented Lines
            const splitProgram = inputProgram.split(`\n`);
            const partiallyCommentedProgram = splitProgram.filter(function(item){
                return !item.startsWith("//");
            })
            // In-Line Comments
            let uncommentedProgram = [];
            for (let i = 0; i < partiallyCommentedProgram.length; i++) {
                inLineSplitItem = partiallyCommentedProgram[i].split(" ");
                if (inLineSplitItem.includes("//")) {
                    uncommentedProgram[i] = inLineSplitItem[0];
                } else {
                    uncommentedProgram[i] = partiallyCommentedProgram[i];
                }
            }
            return uncommentedProgram;
        },

        extractBreakPoints (inputProgram) {
            return inputProgram
        },

        lineStateChange (isAssembled) {
            let lineNumber = 0;
            if (isAssembled) {
                lineNumber = this.fetchClickedLine(document.getElementById("assembledLineNumbers"));
            } else {
                lineNumber = this.fetchClickedLine(document.getElementById("userLineNumbers"));
            }
            console.log(lineNumber);
        },

        fetchClickedLine (textArea) {
            const lineNumber = 1;
            return lineNumber;

            // const textBeforeCaret = textarea.value.slice(0, textarea.selectionStart);
            // const lineNumber = textBeforeCaret.split("\n").length;
            // return lineNumber;
        },

        // - Emulator Function -
        safeStep () {
            if (this.isRunning) {
                console.log("Can Not Step, Already Running!");
            } else {
                console.log("Stepping!");
                this.breakFault = false;
                this.Step()
            }
        },

        Step() {
            this.getInstruction();
            stepFunction(this);
            if (!this.falseOperation) {
                this.currentState.cycleCount ++;
            }
            this.printState(this.currentState);
        },

        Start() {
            if (this.isRunning) {
                console.log("Already Running!")
            } else {
                this.isRunning = true;
                this.breakFault = false;
                this.stopRequested = false;
                document.getElementById("emuAssembleState").textContent = "*Busy*";
                console.log("Starting!");
                this.Run();
            }
        },

        Stop() {
            if (this.isRunning) {
                this.stopRequested = true;
                console.log("Stop Requested!");
            } else {
                console.log("Can Not Stop, Not Running!");
            }
        },

        Reset() {
            if (this.isRunning) {
                console.log("Reset Requested!");
                this.resetRequested = true;
                this.illegalInstructionFault = false;
                this.breakFault = false;
            } else {
                console.log("Resetting!");
                resetFunction(this);
                this.printState(this.currentState);
            }
        },

        printState(emuState) {
            document.getElementById("currentCycleCount").textContent = "Cycle Count: " + emuState.cycleCount;
            document.getElementById("emulatorPC").textContent = "Next Program Counter: " + emuState.programCounter;
            document.getElementById('currentRegisterFile0').textContent = `Register File   [3:0]: [${emuState.registerFile[0]}, ${emuState.registerFile[1]}, ${emuState.registerFile[2]}, ${emuState.registerFile[3]}]`;
            document.getElementById('currentRegisterFile1').textContent = `Register File   [7:4]: [${emuState.registerFile[4]}, ${emuState.registerFile[5]}, ${emuState.registerFile[6]}, ${emuState.registerFile[7]}]`;
            document.getElementById('currentRegisterFile2').textContent = `Register File  [11:8]: [${emuState.registerFile[8]}, ${emuState.registerFile[9]}, ${emuState.registerFile[10]}, ${emuState.registerFile[11]}]`;
            document.getElementById('currentRegisterFile3').textContent = `Register File [15:12]: [${emuState.registerFile[12]}, ${emuState.registerFile[13]}, ${emuState.registerFile[14]}, ${emuState.registerFile[15]}]`;
            document.getElementById('currentFlagRegister').textContent = `Carry Out: ${!!emuState.flagRegister[0]}, Zero Flag: ${!!emuState.flagRegister[1]}`;
        },

        //TODO: Update this with Program class
        getInstruction() {
            const copiedProgram = document.getElementById("assembledProgram").value;
            const splitProgram = copiedProgram.split(`\n`)
            if (this.currentState.programCounter >= 0 && this.currentState.programCounter <= (splitProgram.length - 1)) {
                this.fetchedInstruction = splitProgram[this.currentState.programCounter];
                this.falseOperation = false;
                console.log("valid PC!")
            } else {
                this.fetchedInstruction = `PC Out of Bounds!`;
                this.currentState.programCounter = 0;
                this.falseOperation = true;
            }
            // Move the line below to the Print State function
            document.getElementById('currentInstructionStatus').textContent = `Executed Inst(PC): ${this.fetchedInstruction}(${this.currentState.programCounter})`;
        },

        Run() {
            // Reset
            if (this.resetRequested) {
                resetFunction(this);
                this.printState(this.currentState);
                this.resetRequested = false;
                this.illegalInstructionFault = false;
                this.breakFault = false;
                console.log("Resetting!");
                setTimeout(() => this.Run(), this.StepRate);
            // Stop
            } else if (this.stopRequested) {
                this.isRunning = false;
                this.stopRequested = false;
                document.getElementById("emuAssembleState").textContent = "*Ready*";
                console.log("Stopped!");
            // Step
            } else if (this.isRunning) {
                this.Step();
                setTimeout(() => this.Run(), this.StepRate);
            }
        }
    };
}

