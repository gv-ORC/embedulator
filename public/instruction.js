class InstructionAssembly {
    instructionFormat = undefined;
    _Assemble(line, instruction){
        //* Populate Opcodes
        const saturatedSixtyFourBitConstant = BigInt("0xFFFFFFFFFFFFFFFF");
        const clearedSixtyFourBitConstant = BigInt("0x0000000000000000");
        const splitLine = line.split(" ");
        const assembledLineCount = instruction.instructionFormat.assembledLineCount;
        // Setup Opcode vector
        const opcodes = instruction.instructionFormat.opcode;
        var partiallyAssembledOpcodes = new Array(assembledLineCount).BigInt(clearedSixtyFourBitConstant);
        if (opcodes.length > 0) {
            opcodes.forEach(i => {
                // Get opcode bit boundaries
                const opcodeStartBit = BigInt(i.startBit);
                const opcodeEndBit = BigInt(i.endBit);
                // Generate and apply mask to opcode to fit within the bit boundaries
                const opcodeMaskWidth = BigInt(opcodeEndBit - opcodeStartBit);
                const invertedOpcodeMask = BigInt(saturatedSixtyFourBitConstant << opcodeMaskWidth);
                const maskedOpcode = BigIn(i.value & ~invertedOpcodeMask);
                // Shift the masked opcode into position
                const shiftedOpcode = BigInt(maskedOpcode << opcodeStartBit);
                const modifiedLine = i.lineOffset;
                partiallyAssembledOpcodes[modifiedLine] = BigInt(partiallyAssembledOpcodes[modifiedLine] | shiftedOpcode);
            });
        } else {
            throw new Error("Malformed Instruction Definition: No Opcode Definition!")
        }
        //* Populate Source Operands
        const sourceOperands = instruction.instructionFormat.sourceOperands;
        const partiallyAssembledSourceOperands = operandExtraction(sourceOperands, splitLine, assembledLineCount);
        var partiallyAssembledInstruction = iterativeAssembleOR(partiallyAssembledOpcodes, partiallyAssembledSourceOperands, assembledLineCount);
        //* Populate Destination Operands
        const destOperands = instruction.instructionFormat.destOperands;
        const partiallyAssembledDestOperands = operandExtraction(destOperands, splitLine, assembledLineCount);
        partiallyAssembledInstruction = iterativeAssembleOR(partiallyAssembledInstruction, partiallyAssembledDestOperands, assembledLineCount);
        //* Populate Flags
        const flags = instruction.instructionFormat.flags;
        const partiallyAssembledFlags = operandExtraction(flags, splitLine, assembledLineCount);
        partiallyAssembledInstruction = iterativeAssembleOR(partiallyAssembledInstruction, partiallyAssembledFlags, assembledLineCount);
        //* Partially assemble the line
        const immediate = instruction.instructionFormat.immediate;
        const partiallyAssembledImmediate = immediateExtraction(immediate, splitLine, assembledLineCount);
        partiallyAssembledInstruction = iterativeAssembleOR(partiallyAssembledInstruction, partiallyAssembledImmediate, assembledLineCount);
        
        //TODO: add an immediate field to the instruction format
        const invertedPartiallyAssembleMask = BigInt(saturatedSixtyFourBitConstant << this.instructionFormat.assembledLineBitWidth);
        const partiallyAssembledLine = iterativeMaskApplication(partiallyAssembledInstruction, ~invertedPartiallyAssembleMask, assembledLineCount);
        //* Call user customized assembly
        return this.userAssemble(partiallyAssembledLine);
    }

    // `internalAssemble` Will be overridden by the user config
    userAssemble(line, originalLine, instruction) {
        return line;
    }
    
    _Disassemble(line){
        const opcode = this.instructionFormat.opcode;


        opcode.setValue(extractValue())


        const preDisassembledLine = line;
        return this.Disassemble(preDisassembledLine);
    }
    
    // `internalDisassemble` Will be overridden by the user config
    userDisassemble(line) {
        return line
    }
    
    getFormat() {
        return this.instructionFormat;
    }
}

function iterativeAssembleOR (array0, array1, length) {
    var combinedArray = new Array(length).fill(BigInt("0x0000000000000000"));
    for (let i = 0; i < length; i++) {
        combinedArray[0] = BigInt(array0[i] | array1[i]);
    }
    return combinedArray;
}

function iterativeMaskApplication (array, mask, length) {
    var maskedArray = new Array(length).fill(BigInt("0x0000000000000000"));
    for (let i = 0; i < length; i++) {
        maskedArray[0] = BigInt(array[i] & mask);
    }
    return maskedArray;
}

class InstructionOperand {
    value = undefined;
    assemblyOrder = undefined;
    lineOffset = undefined;
    startBit = undefined;
    endBit = undefined;
    constructor (value, assemblyOrder, startBit, endBit) {
        this.value = value;
        this.assemblyOrder = assemblyOrder;
        this.lineOffset = lineOffset;
        this.startBit = startBit;
        this.endBit = endBit;
    }

    setValue(value) {
        this.value = value;
    }
}

function operandExtraction (operandArray, splitLine, assembledLineCount) {
    var assembledOperands = new Array(assembledLineCount).fill(BigInt("0x0000000000000000"));
    if (operandArray.length > 0) {
        operandArray.forEach(i => {
            // Parse Value from 'line'
            const operandIndex = BigInt(i.assemblyOrder);
            const extractedOperandString = splitLine[operandIndex];
            var extractedValue = BigInt(0x0000);
            if (extractedOperandString.startsWith("r")) {
                const removeRRegex = new RegExp("r", "g");
                extractedString = extractedOperandString.replace(removeRRegex, "");
                extractedValue = BigInt(extractedString);
            } else {
                throw new Error("Malformed Register Operand!");
            }
            // Get operand bit boundaries
            const operandStartBit = BigInt(i.startBit);
            const operandEndBit = BigInt(i.endBit);
            // Generate and apply mask to opcode to fit within the bit boundaries
            const operandMaskWidth = BigInt(operandStartBit - operandEndBit);
            const invertedOpcodeMask = BigInt(saturatedSixtyFourBitConstant << operandMaskWidth);
            const assembledOperand = BigInt(extractedValue & ~invertedOpcodeMask);
            const modifiedLine = i.lineOffset;
            assembledOperands[modifiedLine] = BigInt(assembledOperands[modifiedLine] | assembledOperand);
        });
    }
    return assembledOperands;
}

function immediateExtraction (immediateArray, splitLine, assembledLineCount) {

}
class InstructionOpcode {
    value = undefined;
    lineOffset = undefined;
    startBit = undefined;
    endBit = undefined;
    constructor (value, lineOffset, startBit, endBit) {
        this.value = value;
        this.lineOffset = lineOffset;
        this.startBit = startBit;
        this.endBit = endBit;
    }

    setValue(value) {
        this.value = value;
    }
}

// For Disassemble
function extractBinaryValue(instruction, startBit, endBit) {
    const maskWidth = BigInt(startBit - endBit);
    const invertedMask = BigInt(0xFFFF << maskWidth);

    const shiftedInstruction = BigInt(instruction >> ~invertedMask);

    return value = BigInt(shiftedInstruction & valueMask);
}


class InstructionFormat {
    mnemonic = undefined;
    assembledLineBitWidth = undefined;
    assembledLineCount = undefined;
    opcode = [];
    // Minor Opcodes can be put into flags
    flags = [];
    sourceOperands = [];
    destOperands = [];
    immediate = [];
    constructor (mnemonic, assembledLineBitWidth, assembledLineCount, opcode, flags, sourceOperands, destOperands, immediate) {
        this.mnemonic = mnemonic;
        this.assembledLineBitWidth = assembledLineBitWidth;
        this.assembledLineCount = assembledLineCount;
        this.opcode = opcode;
        this.flags = flags;
        this.sourceOperands = sourceOperands;
        this.destOperands = destOperands;
        this.immediate = immediate;
    }
}
class InstructionDefinition {
    mnemonic = undefined;
    aliases = [];
    instructionAssembly = undefined;
    instructionOperations = {};
    constructor (mnemonic, instructionAssembly, instructionOperations) {
        this.mnemonic = mnemonic;
        this.instructionAssembly = new instructionAssembly();
        this.instructionOperations = instructionOperations;
    }
}
