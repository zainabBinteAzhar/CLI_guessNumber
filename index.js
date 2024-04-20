#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Title() {
    const rainbowTitle = chalkanimation.rainbow("\nNumber Guessing Game\n");
    await sleep();
    rainbowTitle.stop();
}
function Exit() {
    console.clear();
    const msg = "\nThankYou!\nGuess Again!\n";
    figlet(msg, (_err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
await Title();
let choice, minNum, maxNum, secretNum, guess;
do {
    console.log(chalk.magenta("\n**********MENU**********\n"));
    console.log(chalk.magenta("Enter 1: Guess the number\nEnter 0: Exit"));
    const userInput = await inquirer.prompt([
        {
            name: "data",
            type: "number",
            message: chalk.bgMagenta("\nEnter your choice: "),
        }
    ]);
    choice = parseInt(userInput.data);
    if (choice == 1) {
        console.log(chalk.greenBright("\n*****Range of your Choice*****"));
        const userInput1 = await inquirer.prompt([
            {
                name: "data",
                type: "number",
                message: chalk.bgCyan("Enter minimum Number: "),
            }
        ]);
        minNum = parseInt(userInput1.data);
        const userInput2 = await inquirer.prompt([
            {
                name: "data",
                type: "number",
                message: chalk.bgCyan("Enter maximum Number: "),
            }
        ]);
        maxNum = parseInt(userInput2.data);
        secretNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
        //console.log("Generated Number is: "+secretNum);
        do {
            const userInput3 = await inquirer.prompt([
                {
                    name: "data",
                    type: "number",
                    message: chalk.bgCyan("Guess the number: "),
                }
            ]);
            guess = parseInt(userInput3.data);
            if ((guess < secretNum) && (guess >= minNum) && (guess <= maxNum)) {
                console.log(chalk.yellow("Your guess is too low"));
            }
            else if ((guess > secretNum) && (guess >= minNum) && (guess <= maxNum)) {
                console.log(chalk.yellow("Your guess is too high"));
            }
            else if (guess == secretNum) {
                console.log(chalk.blue("Congratulations! you guessed the right number"));
            }
            else {
                console.log(chalk.red("Your guess is out of the range"));
            }
        } while (guess != secretNum);
    }
    else if (choice == 0) {
        Exit();
    }
    else {
        console.log(chalk.redBright("\nERROR: SOMETHING WRONG ENTERED\n"));
    }
} while (choice != 0);
