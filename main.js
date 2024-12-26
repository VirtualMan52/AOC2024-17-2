// ===== READING THE INPUT =====

fetch("input.txt")
  .then((res) => res.text())
  .then((text) => {
    
    main(text)

  })
.catch((e) => console.error(e));

let initialProgram = [];
let initialA = 0;
let initialB = 0;
let initialC = 0;

function main(cleantext) {

  initialProgram = cleantext.replace("Register A: ","").replace("\nRegister B: ",",").replace("\nRegister C: ",",").replace("\n\nProgram: ",",").split(",");
  initialA = initialProgram[0];
  initialB = initialProgram[1];
  initialC = initialProgram[2];
  initialProgram.splice(0,3);

}

// ===== RUNNING THE PROGRAM =====

let a = 0;
let b = 0;
let c = 0;
let program = [];
let pointer = 0;
let output = [];

function runProgram(initializationValue) {
  output = [];
  pointer = 0;
  program = [...initialProgram];
  if (initializationValue == null) a = initialA;
  else a = initializationValue;
  b = initialB;
  c = initialC;
  
  while (pointer < program.length) {
      step();
  }
  let result = "";
  for (let o of output) result += o + ",";
  result = result.substring(0,result.length - 1);
  return result;
}

function combo(operand) {
    switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
        return operand;
        case 4:
        return a;
        case 5:
        return b;
        case 6:
        return c;
        case 7:
        console.log("THIS PROGRAM IS INVALID. WHAT");
    }
}

function step() {
    let instruction = parseInt(program[pointer]);
    let operand = parseInt(program[pointer + 1]);

    switch (instruction) {
      case 0:
        // adv
        a = Math.floor(a / Math.pow(2,combo(operand)));
      break;
      case 1:
        // bxl
        b = b ^ operand;
      break;
      case 2:
        // bst
        b = combo(operand) % 8;
      break;
      case 3:
        // jnz
        if (a != 0) {
          pointer = operand - 2;
        }
      break;
      case 4:
        // bxc
        b = b ^ c;
      break;
      case 5:
        // out
        output.push(combo(operand) % 8);
      break;
      case 6:
        // bdv
        b = Math.floor(a / Math.pow(2,combo(operand)));
      break;
      case 7:
        // cdv
        c = Math.floor(a / Math.pow(2,combo(operand)));
      break;
    }

    pointer += 2;
}

// ===== SOLVING PART 2 =====

let octalAmount = 0;

function solve(wantedResult) {
  if (wantedResult == null) wantedResult = [...initialProgram];
  octalAmount = wantedResult.length;
  console.log(`Testing combinations of ${octalAmount} octal digits.`);

  if (octalAmount > 0) {
    launchBranch(["000"],wantedResult);
    launchBranch(["001"],wantedResult);
    launchBranch(["010"],wantedResult);
    launchBranch(["011"],wantedResult);
    launchBranch(["100"],wantedResult);
    launchBranch(["101"],wantedResult);
    launchBranch(["110"],wantedResult);
    launchBranch(["111"],wantedResult);
  }
};

function launchBranch(blocks,wantedResult) {
  let currentNumberBinary = "";
  for (let i = 0; i < octalAmount; i++) {
    if (i < blocks.length) currentNumberBinary += blocks[i]; else currentNumberBinary += "000";
  }
  let currentNumberDecimal = parseInt(currentNumberBinary,2);
  
  runProgram(currentNumberDecimal);
  let currentDigit = octalAmount - blocks.length;
  if (output.length == wantedResult.length && output[currentDigit] == wantedResult[currentDigit]) {
    if (blocks.length == octalAmount) {
      //reached the end, you did it!
      alert("REACHED AN END AT " + currentNumberDecimal);
      console.log("SOLUTION FOUND", currentNumberDecimal, currentDigit, blocks, output);
    } else {
      //launch the next branch
      console.log("CORRECT", currentDigit, blocks, output);
      launchBranch([...blocks,"000"],wantedResult);
      launchBranch([...blocks,"001"],wantedResult);
      launchBranch([...blocks,"010"],wantedResult);
      launchBranch([...blocks,"011"],wantedResult);
      launchBranch([...blocks,"100"],wantedResult);
      launchBranch([...blocks,"101"],wantedResult);
      launchBranch([...blocks,"110"],wantedResult);
      launchBranch([...blocks,"111"],wantedResult);
    }
  } else {
    console.log(currentDigit, blocks, output);
  }
}

// You can attempt to run the program with runProgram();
// You can attempt to find which A value outputs the program with solve();
// The latter doesn't work with my full input.
// However, it does work with the example.
// It is also able to find other values when given only its output.