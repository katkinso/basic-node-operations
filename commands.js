const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

 function errorHandler(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function reverseString(inputString) {

    const sentenceArray = inputString.slice(0,inputString.length);
    const reversedSentenceArray = [];

    sentenceArray.forEach((word) => {   
        
        let wordArr = word.split('');
        let reversedWordArr = [];

        wordArr.forEach((char) => {
            reversedWordArr.unshift(char);
        })

        reversedSentenceArray.push(reversedWordArr.join(''))
             
    });

    return reversedSentenceArray.join(' ');
 }


//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":
     //we will add the functionality of echo next within the object commandLibrary    
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1,3));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1,3));
      break;
    case "reverse":
      commandLibrary.reverse(userInputArray.slice(1));
      break;
    default:
      errorHandler("Incorrect command. Try again.");
  }
 }

//where we will store the logic of our commands
 const commandLibrary = {
    "reverse": function(inputString){

        const output = reverseString(inputString);
        done(output);

    },
    "head": function(fullPath){
        const fileName = fullPath[1];
        const numlines = fullPath[0];

        fs.readFile(fileName,'utf-8',(err, data) => {
            if (err) throw err;            
            var lines = data.split("\n").slice(0,numlines).join('\n');
            done(lines);
        })
    },
    "tail": function(fullPath){
        const fileName = fullPath[1];
        const numlines = fullPath[0];

        fs.readFile(fileName,'utf-8',(err, data) => {
            if (err) throw err;  

            const lines = data.split("\n");
            const tail = [];
            const len = lines.length - 1

            for (i = len; i > len - numlines; i--){
                tail.push(lines[i])
            }

            done(tail.join('\n'));
        })
    },
    "echo": function(userInput) {
        done(userInput);
    },
    //the cat command
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;