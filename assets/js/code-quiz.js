(function() {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        var output = [];

        // for each question...
        quizQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (choiceNumber in currentQuestion.answers) {

                    // ...add an HTML button
                    answers.push(
                        `<label>
                        <button type="button" name="question${questionNumber}" value="${choiceNumber}">
                        ${choiceNumber} :
                        ${currentQuestion.answers[choiceNumber]}
                        </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);

        return {
            total,
            seconds
        };
    }

    function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const timeinterval = setInterval(() => {
            const t = getTimeRemaining(endtime);
            clock.innerHTML = 'seconds:' + t.seconds;
            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }, 1000);
        const secondsSpan = clock.querySelector('.seconds');
    }

    function checkAnswer() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        quizQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `button[name=question${questionNumber}]:click`;
            const playerAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (playerAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // correct!
                answerContainers[questionNumber].style.color = 'lightgreen';
            } else {
                // wrong!
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show remaining time
        clockContainer.innerHTML = `${remainingTime}`;
        initializeClock('clockdiv', deadline);
        const timeInSeconds = 60;
        const currentTime = Date.parse(new Date());
        const deadline = new Date(currentTime + timeInSeconds * 1000);
    }

    function viewHighScores() {
        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === slides.length - 1) {
            answerButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        } else {
            answerButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    // Variables
    const highScoresContainer = document.getElementById('highscores');
    const clockContainer = document.getElementById('clock');
    const introContainer = document.getElementById('intro');
    const startButton = document.getElementById('start');
    const quizContainer = document.getElementById('quiz');
    const quizQuestions = [{
            question: "The condition in an if / else satement is enclosed with _____.",
            answers: {
                1.: "quotes",
                2.: "curly brackets",
                3.: "parenthesis",
                4.: "square brackets"
            },
            correctAnswer: "curly brackets"
        },
        {
            question: "String values must be enclosed within _____ when begin assigned to variables.",
            answers: {
                1.: "commas",
                2.: "curly brackets",
                3.: "quotes",
                4.: "parenthesis"
            },
            correctAnswer: "quotes"
        },
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            answers: {
                1.: "JavaScript",
                2.: "terminal/bash",
                3.: "for loops",
                4.: "console.log"
            },
            correctAnswer: "console.log"
        }, {
            question: "Commonly used data types DO Not Include:",
            answers: {
                1.: "strings",
                2.: "booleans",
                3.: "alerts",
                4.: "numbers"
            },
            correctAnswer: "alerts"
        }, {
            question: "Arrays in JavaScript can be used to store _____.",
            answers: {
                1.: "numbers and strings",
                2.: "other arrays",
                3.: "booleans",
                4.: "all of the above"
            },
            correctAnswer: "all of the above"
        }
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const startButton = document.getElementById("start");
    const slides = document.querySelectorAll(".slide");
    let introContainer = 0;

    // Show the first slide
    showSlide(introContainer);

    // Event listeners
    startButton.addEventListener("click", showNextSlide);
    highScoresContainer.addEventListener("click", viewHighScores);
})();