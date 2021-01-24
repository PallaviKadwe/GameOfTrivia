const quizOne = [
{
    question: "Which drink is sometimes called 'The Green Fairy'?",
    answers: {
    a: "Contreau",
    b: "Creme de Menthe",
    c: "Mint julep",
    d: "Absinthe"
    },
    correctAnswer: "Absinthe"
},
{
    question: "The ice cream sundae was invented as a popular treat for consumption on a Sunday. In which country did it originate?",
    answers: {
    a: "Italy",
    b: "America",
    c: "France",
    d: "Korea"
    },
    correctAnswer: "America"
},
{
    question: "Frothy coffee called Cappuccino was named after WHAT?",
    answers: {
    a: "Italian cakes",
    b: "Italian poodles",
    c: "Franciscan friars",
    d: "Composer Puccini"
    },
    correctAnswer: "Franciscan friars"
},
{
    question: "What is an essential ingredient in cooking a carbonade?",
    answers: {
    a: "Beer",
    b: "Mushrooms",
    c: "Cream",
    d: "Lemon grass"
    },
    correctAnswer: "Beer"
},
{
    question: "Which part of the kola tree was used to flavour drinks?",
    answers: {
    a: "Nuts",
    b: "Leaves",
    c: "Sap",
    d: "Roots"
    },
    correctAnswer: "Nuts"
},
{
    question: "Kase is German for WHICH food?",
    answers: {
    a: "Carrot",
    b: "Cheese",
    c: "Beef",
    d: "Onion"
    },
    correctAnswer: "Cheese"
},
{
    question: "If you were served 'gumbo' in the southern US, what would you expect to be eating?",
    answers: {
    a: "A rhubarb pie",
    b: "Corn flatbread",
    c: "A sticky rice cake",
    d: "A hearty soup"
    },
    correctAnswer: "A hearty soup"
},
{
    question: "Which type of alcoholic spirit is 'bourbon'?",
    answers: {
    a: "Brandy",
    b: "Vodka",
    c: "Whisky",
    d: "Gin"
    },
    correctAnswer: "Whisky"
},
{
    question: "In which restaurant are you most likely to find the dish Chow Mein?",
    answers: {
    a: "Thai",
    b: "Chinese",
    c: "Indian",
    d: "Indonesian"
    },
    correctAnswer: "Chinese"
},
{
    question: "What is the Italian word for dough?",
    answers: {
    a: "Panini",
    b: "Pasta",
    c: "Pizza",
    d: "Spaghetti"
    },
    correctAnswer: "Pasta"
}
]

// global variables
let questionCount = 1;
let attemptCount = 0;
let pointTotal = 0;


buildQuizFromArray()

function getTicImage(){
    let ticImg = document.createElement("img");
    ticImg.src = "img/tic.jpg"
    ticImg.Id = "tic"
    ticImg.height = "20"
    ticImg.width = "20"
    ticImg.classList.add("invisible")
    return ticImg;
}

function getCrossImage(){
    let crossImg = document.createElement("img");
    crossImg.src = "img/cross.jpg"
    crossImg.Id = "cross"
    crossImg.height = "20"
    crossImg.width = "20"
    crossImg.classList.add("invisible")
    return crossImg;
}

function buildOption(optionText){
    let option = document.createElement("div");
    option.appendChild(getTicImage());
    option.appendChild(getCrossImage());
    option.innerHTML = optionText;
    option.classList.add("optionHolder")
    option.addEventListener("click", answerLogic)
    // add tic and cross images with invisibility
    option.appendChild(getTicImage());
    option.appendChild(getCrossImage());
    return option;
}



function buildQuizFromArray(){
    let option
    let qHolder
    let question
    let answers
    let qHolderId = 1;

    let container = document.querySelector(".container")

    //Loop through array to display questions and answers
    quizOne.forEach(item => {
        // make div qHolder and append to container
        qHolder = document.createElement("div")
        container.appendChild(qHolder);

        // Add id and visibility false
        qHolder.id = "Q" + qHolderId;
        qHolder.classList.add("invisible")

        question = document.createElement("div")
        question.classList.add("question")
        question.innerHTML = item.question;
        qHolder.appendChild(question);

        // Div to hold answers
        answers = document.createElement("div");
        answers.classList.add("answerHolder")
        qHolder.appendChild(answers);

        // make div to hold answer options; add class; eventListner     
        answers.appendChild(buildOption(item.answers.a)) 
        answers.appendChild(buildOption(item.answers.b))
        answers.appendChild(buildOption(item.answers.c))
        answers.appendChild(buildOption(item.answers.d))

        // append correct answer to that div
        rightResponse = document.createElement("div");
        rightResponse.innerHTML = item.correctAnswer;
        rightResponse.id = "A" + qHolderId;
        rightResponse.classList.add("invisible")
        qHolder.appendChild(rightResponse);

        qHolderId++;
    })

    processAnswers();
}

// grade responses based on attempts ; correct answer on 
// first attempt 40, second 30, third 20, last 0
function gradeAnswers(){

    switch (attemptCount) {
        case 1:
            pointTotal = pointTotal + 40
            break;
        case 2:
            pointTotal = pointTotal + 30
            break;
        case 3:
            pointTotal = pointTotal + 20
            break;
        default:
            pointTotal = pointTotal + 0;
            break;
    }
}

// Wrong answer - display cross on selected answer answers
// Correct answer - calculate points and display;
//                  Make remaining options unclickable 
//                  give user option to move to next question
function answerLogic(event){
    // Wait for user input for answer

    let correctAnswer = event.path[2].children[2].innerHTML
    userInput = event.path[0].innerText

    attemptCount++;
    // Show tic or cross image and grade points and make unclickable
    if(userInput === correctAnswer){
        stopCount();
        
        // display points achieved
        gradeAnswers();
        document.getElementById("totalScore").textContent = "Points - " + pointTotal

        // Show tick mark
        event.path[0].children[0].classList.remove("invisible")
        event.path[0].children[0].classList.add("visible")

        // Make divs unclickable and display points
        for(let i=0; i< event.path[1].children.length; i++){
            event.path[1].children[i].classList.add("grayedOut")
            //console.log(event.path[1].children[i]);
        }

        // Show next button
        document.getElementById("nextQ").classList.remove("invisible")
        document.getElementById("nextQ").classList.add("visible")

        questionCount++;
    }
    else{
        event.path[0].children[1].classList.remove("invisible")
        event.path[0].children[1].classList.add("visible")

        // Make current divs unclickable
        for(let i=0; i< event.path[1].children.length; i++){
            //console.log(event.path[1].children[i].outerText)
            if(userInput === event.path[1].children[i].outerText){
                event.path[1].children[i].classList.add("grayedOut")
                //console.log(event.path[1].children[i])
            }
        }
    }

    console.log("Point " + pointTotal + " Attempt: " + attemptCount + " q No : " + questionCount)
}

function displayLastPage(){

    let finishGame = document.getElementsByClassName("finishGame")[0];
    document.getElementsByClassName("container")[0].classList.add("invisible")        
    finishGame.classList.remove("invisible")
    finishGame.classList.add("visible")

    let gradingLevel = document.createElement("h1")
    if(pointTotal < 100)
        gradingLevel.innerText = "Better luck next time!!"
    else if ((pointTotal > 100) && (pointTotal < 300))
        gradingLevel.innerText = "You did well!!"
    else
        gradingLevel.innerText = "Congratulations!!"
    
    finishGame.appendChild(gradingLevel);

    let para1 = document.createElement("p")
    para1.innerText = "You got a total score of " + (pointTotal)
    finishGame.appendChild(para1);

    let para2 = document.createElement("p")
    para2.innerText = "    Hope this was an interesting experince for you and you learnt a few facts. "
    finishGame.appendChild(para2);
    finishGame.appendChild(document.createElement("br"));

    let para3 = document.createElement("p")
    para3.innerText = " There will be new quiz added soon!!   "
    finishGame.appendChild(para3);

}

/*
function counter() {
    let i = 0;
    var depictTime = function(){
        if (i == 5){
             clearInterval(this);
             console.log("before forceUser " + questionCount)
             // Call function to gray out options and display next button
             forceUserToNextQuestion();
             console.log("after forceUser " + questionCount)
        }
        else 
            document.getElementById("qTimer").innerHTML = (i++) ;
    };
   
    if(i < 5){
        setInterval(depictTime, 1000);
        depictTime();
    }
} 
function counter(){
    var i = 0;
    var timer = setInterval(function() {
        i++
        document.getElementById("qTimer").innerHTML = (i)
        console.log(i);
        if (i === 5) {
            clearInterval(timer);
            console.log("before forceUser " + questionCount)
            // Call function to gray out options and display next button
            forceUserToNextQuestion();
            console.log("after forceUser " + questionCount)
        }
        console.log('post-interval'); //this will still run after clearing
    }, 1000);
}*/

var c = 0;
var t;
var timer_is_on = 0;

function timedCount() {
    document.getElementById("qTimer").innerHTML = c;
    c = c + 1;
    t = setTimeout(timedCount, 1000);
    if(c > 10){
        forceUserToNextQuestion();
    }
}

function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
  c = 0;
}

function forceUserToNextQuestion(){

    // Display timeout on top bar
    document.getElementById("qTimer").innerHTML = "Time Out"
    // Show next button
    document.getElementById("nextQ").classList.remove("invisible")
    document.getElementById("nextQ").classList.add("visible")
    // gray out options on current page
    let currentQ = document.getElementById("Q" + questionCount);

    for(let i=0; i < currentQ.children[1].children.length; i++){
        currentQ.children[1].children[i].classList.add("grayedOut")
    }

    stopCount();

    // increment to next question
    questionCount++;
}  

function displayNextQuestion(){
    console.log("staert Display next Q - " + questionCount)
    let questionList
    previousQuestion = questionCount - 1;

    // if question count is first - show first question
    // if question count is last then display end message
    // or display appropriate question
    if(questionCount == 1){
        console.log("Q is 1 loop")
        questionList = document.getElementById("Q" + questionCount);
        questionList.classList.remove("invisible")
        questionList.classList.add("visible")
        startCount();//counter();
        c=0;
    }else if(questionCount == 11){
        questionCount = 10;
        displayLastPage();
    } else {
        console.log("Q is more than 1 loop")
        // reset attempt count for fresh question
        attemptCount=0;

        // make previous question invisible and next question visible
        questionList = document.getElementById("Q" + previousQuestion);
        questionList.classList.remove("visible")
        questionList.classList.add("invisible")
        

        questionList = document.getElementById("Q" + questionCount);
        questionList.classList.remove("invisible")
        questionList.classList.add("visible")
        startCount();//counter();
        c=0;
    } 

    // update questionCount on header bar
    document.getElementById("qCount").textContent = questionCount + " / " + "10"
}

function processAnswers(){   
    stopCount(); 
    displayNextQuestion();
}



