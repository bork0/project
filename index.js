const button = document.getElementById('button');
const image = document.getElementById('ball');
const answer = document.getElementById('answer');
const name = document.getElementById('name');
const question = document.getElementById('question');
const history = document.getElementById('history');

let audio = new Audio();
audio.src = "magic.mp3";

button.addEventListener('click', function() {
    image.style.transitionDuration = '2.45s';
    image.style.transform = 'rotate(3600deg)';
    audio.play();
    answer.innerHTML = 'Let me ask Moirai';
    answer.style.top = '34%';
    setTimeout(function() {
        answer.innerHTML = generator();
        image.style.transitionDuration = '0s';
        image.style.transform = 'rotate(0deg)';
    }, 2445)
});


document.getElementById("name").onfocus = function() { nameBorder() };

function nameBorder() {
    let name = document.getElementById("name");
    name.style.borderColor = 'initial';
    name.value = '';
    name.placeholder = 'Your Name';
}

document.getElementById("question").onfocus = function() { questionBorder() };

function questionBorder() {
    let question = document.getElementById('question');
    question.style.borderColor = 'initial';
    question.value = '';
    question.placeholder = 'Ask me...';
}

const answersArray = ['I will keep it in secret', 'And may the odds will ever be in your favor', 'Yes, but do it drunk as fuck', 'No, if you are sober', 'My sources say no, but they also said Hillary would win', `Don't do anything I would do, and don't do anything I wouldn't do`, 'Yes!', 'Say no more', `Don't think so`, 'No way', 'Definitely yes!', 'Maybe yes, maybe no', `Don't you dare`, 'Give it your best shot', 'Go get it', 'Well, yes, but actually no', 'Yes, unless you screw it up', 'Outlook not so good', 'Most likely'];

function generator() {
    setTimeout(function() {
        if (name.value === '' || !isNaN(name.value) || question.value === '' || !isNaN(question.value)) {
            checkMistake();
        } else {
            createTable();
        }
    }, 1);
};

function randomWords(answersArray) {
    let index = randomNumber(answersArray);
    return answersArray[index];
}

function randomNumber(answersArray) {
    let arrLength = answersArray.length - 1;
    return Math.round(Math.random() * arrLength);
}

function checkMistake() {
    if ((name.value === '' || !isNaN(name.value)) && (question.value === '' || !isNaN(question.value))) {
        name.style.borderColor = 'red';
        question.style.borderColor = 'red';
        name.placeholder = 'Who are you?';
        question.placeholder = 'Ask me again';
        name.value = '';
        question.value = '';
        answer.innerHTML = 'Try again';
    } else if ((question.value === '' || !isNaN(question.value)) && (name.value !== '' || isNaN(name.value))) {
        question.style.borderColor = 'red';
        name.style.borderColor = 'initial';
        question.placeholder = 'Ask me again';
        name.placeholder = 'Your Name'
        question.value = '';
        name.value = '';
        answer.innerHTML = 'Try again';
    } else if ((name.value === '' || !isNaN(name.value)) && (question.value !== '' || isNaN(question.value))) {
        name.style.borderColor = 'red';
        question.style.borderColor = 'initial';
        name.placeholder = 'Who are you?';
        question.placeholder = 'Ask me...'
        name.value = '';
        question.value = '';
        answer.innerHTML = 'Try again';
    } else if ((question.value !== '' || isNaN(question.value)) && (name.value !== '' || isNaN(name.value))) {
        question.style.borderColor = 'initial';
        name.style.borderColor = 'initial';
        question.value = '';
        name.value = '';
        question.placeholder = 'Ask me...';
        name.placeholder = 'Your Name';
    }
};

function position() {
    if (answer.innerHTML === answersArray[4]) {
        answer.style.top = '31%';
    } else if (answer.innerHTML === answersArray[5]) {
        answer.style.top = '27%';
    } else {
        answer.style.top = '34%';
    }
};

let resultsArray = [];

function createTable() {
    let currentAnswer = randomWords(answersArray);
    answer.innerHTML = currentAnswer;
    position();
    let now = new Date;
    let currentTime = `${now.getHours()}: ${now.getMinutes()}: ${now.getSeconds()}`;
    resultsArray.push({
        name: name.value,
        question: question.value,
        currentAnswer,
        currentTime
    });
    let tableBody = document.createElement('tbody');

    resultsArray.forEach(item => {
        let tableRow = document.createElement('tr');
        let htmlTable = '<td>' + item.name + '</td><td>' + item.question + '</td><td>' + item.currentAnswer + '</td><td>' + item.currentTime + '</td>';
        tableRow.innerHTML = htmlTable;
        tableBody.appendChild(tableRow);
        for (let b = 0; b < 1000; b++) {
            let safeIndex = 0;
            safeIndex += b * (b + 1) / 2;
            if (tableRow.rowIndex !== safeIndex) {
                history.deleteRow(tableRow.rowIndex);
            };
        };
    });
    history.appendChild(tableBody);
};