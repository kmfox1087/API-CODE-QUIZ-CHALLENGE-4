var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

var score = 0;
var questionIndex = 0;

var questions = [
    {
        title: "Inside which HTML element do we put the JavaScript",
        choices: ["javascript", "js", "scripting", "script"],
        answer: "script"
    },
    {
        title: "Which built in method combines the next two strings and returns a new string?",
        choices: ["apend()", "concant()", "attach()", "None of the above."],
        answer: "concant()"
    },
    {
        title: "Which of the following function of string object combines the text of two strings and returns a new string?",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Code from: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});
 
//shows questions
function render(questionIndex) { 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    //Renders choices to the page
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//this compares choices to answer (w/ penalty)
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // if correct
        if (element.textContent == questions[questionIndex].answer) {
            score++;
        } else {
            //-5 seconds for penalty
            secondsLeft = secondsLeft - penalty;
        }
 }}

 // question index determines question user is on

 if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent = "End of quiz!" + "Your score was " + score + "/" + questions.length;
} else {
    render(questionIndex); 
    questionsDiv.appendChild(createDiv);
} 

//this will append the last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // heading 
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // p
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // takes time remaining and replaces score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }
}

// initials label
var createLabel = document.createElement("label");
createLabel.setAttribute("id", "createLabel");
createLabel.textContent = "Enter your initals!";

questionsDiv.appendChild(createLabel);

var createInput = document.createElement("input");
createInput.setAttribute("type", "text");
createInput.setAttribute("id", "initals");
createInput.textContent = "";

questionsDiv.appendChild(createInput);

//enter name

var createSubmit = document.createElement("button");
createSubmit.setAttribute("type", "submit");
createSubmit.setAttribute("id", "submit");
createSubmit.textContent = "submit";

questionsDiv.appendChild(createSubmit);

//event listener to get initals/local storage to save to web

createSubmit.addEventListener("click", function () {
    var initals = createInput.value;

    if (initals === null) {
        console.log("There wasn't anything entered!");
    } else {
        var finalScore = {
            initals: initals,
            score: timeRemaining
        }
        //if there's no value
    } console.log(finalScore); 
    var allScores = localStorage.getItem("allScores");
    if (allScores === null) {
        allScores = [];
        //what to do with value
    } else {
        allScores = JSON.parse(allScores);
    }
    allScores.push(finalScore);
    var newScore = JSON.stringify(allScores);
    localStorage.setItem("allScores", newScore);
    //gets player back to final page
    window.location.replace(".highscores.html");
}) 