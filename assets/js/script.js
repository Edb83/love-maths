// Wait for the DOM to finsih loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') == 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }
    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })
})


function runGame(gameType) {

    // Clear and focus on answerbox
    let answerBox = document.getElementById('answer-box');
    answerBox.value = '';
    answerBox.focus();

    // Generate two random numbers (1-25)
    let num1 = Math.floor(Math.random()*25) + 1;
    let num2 = Math.floor(Math.random()*25) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'division') {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

function checkAnswer() {
    // Checks the answer against the first element in
    // the returned calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        // alert("Hey! You got it right :D");
        incrementScore();
    } else {
        // alert(`Aww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    // Get the operands and operator from DOM
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, 'addition'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply']
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract']
    } else if (operator === '/') {
        return [operand1 / operand2, 'division']
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
    // Get the current score from the DOM and increment it

    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++oldScore; // ++ before to update oldScore before changed in DOM
}

function incrementWrongAnswer() {
    // Get the current number of incorrect answers from the DOM and increment it

    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore; // ++ before to update oldScore before changed in DOM
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 * operand2;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}

