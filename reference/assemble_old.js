function Assemble(inputProgram, em, liveAssemble) {
    // Process Assembly Code
    if (em.codeInAssembly) {
        document.getElementById('assembledProgram').value = "0000\nBREAK\nE001";

    // Process Machine Code
    } else {
        document.getElementById('assembledProgram').value = inputProgram.join(`\n`);
        // document.getElementById('assembledProgram').value = inputProgram;
    }
    console.log("Assembled!");
}