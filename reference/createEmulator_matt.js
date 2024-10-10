export function createEmulator(initialState, stepFunction, uiUpdateFunction, resetFunction) {
    return {
  
      // --- Public ---
  
      StepRateLimit: 100, // ms between steps when running
      UiUpdateLimit: 1000, // ms between UI updates
      Program: [], // array of instructions
      State: initialState,
  
      Step() { stepFunction(this) },
  
      Start() {
        this.isRunning = true;
        this.stopRequested = false;
        console.log("VM started");
      },
  
      async Reset() {
        await this.stop();
        resetFunction(this);
        console.log("VM reset");
      },
  
      // potentially unnecessary complex stop method, ensures no race conditions though
      Stop() {
        if (this.isRunning) {
          this.stopRequested = true;
          console.log("VM stop requested");
          return new Promise(resolve => {
            const checkStopped = () => {
              if (!this.isRunning) {
                console.log("VM stopped");
                resolve();
              } else {
                setTimeout(checkStopped, 10);
              }
            };
            checkStopped();
          });
        }
        return Promise.resolve();
      },
  
      Init() {
        this.run();
      },
  
      // --- Private ---
  
      isRunning: false,
      stopRequested: false,
      lastUiUpdate: 0,
  
      updateUI() { uiUpdateFunction(this) },
  
      run() {

        console.log("tick")

        // handle step
        if (this.isRunning && !this.stopRequested) {
          this.step();
        } else if (this.stopRequested) {
          this.isRunning = false;
          this.stopRequested = false;
        }
        // handle UI
        if (Date.now() - this.lastUiUpdate > this.UiUpdateLimit) {
          this.updateUI();
          this.lastUiUpdate = Date.now();
        }
        // schedule next run
        setTimeout(() => this.run(), this.StepRateLimit);
      },
    };
  }
  
  // Usage example
  
//   var exampleState = {
//     pc: 0,
//     regfile: new Array(8).fill(0),
//     ram: new Array(256).fill(0),
//   };
  
//   function exampleStep(emulator) {
//     emulator.State.pc++;
//   }
  
//   function exampleUiUpdate(emulator) {
//     var exampleElement = document.getElementById("example");
//     exampleElement.innerHTML = `PC: ${emulator.State.pc}`;
//   }
  
//   function exampleReset(emulator) {
//     emulator.State = exampleState;
//   }
  
//   var exampleEmulator = createEmulator(exampleState, exampleStep, exampleUiUpdate, exampleReset);
//   exampleEmulator.Init();