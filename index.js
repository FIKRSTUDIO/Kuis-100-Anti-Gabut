//inisiasi soal dalam quiz
const questions = [
    {
        question: "Kata-kata dari Gen Alpha adalah?",
        optionA: "Sigma",
        optionB: "Yatta",
        optionC: "Gue",
        optionD: "You",
        correctOption: "optionA"
    },

    {
        question: "Istri Minato adalah?",
        optionA: "Temari",
        optionB: "Kushina",
        optionC: "Hiruzen",
        optionD: "Hinata",
        correctOption: "optionB"
    },

    {
        question: "Pencipta serial Naruto?",
        optionA: "Hamura",
        optionB: "Kak Gem",
        optionC: "Abraham Lincoln",
        optionD: "Masashi Kishimoto",
        correctOption: "optionD"
    },

    {
        question: "Kata-kata kak Gem adalah?",
        optionA: "Yatta!",
        optionB: "Lu punya duit,Lu punya kuasa",
        optionC: "Paham!?",
        optionD: "Dattebayo",
        correctOption: "optionC"
    },

    {
        question: "Planet ke 5 dari Matahari adalah?",
        optionA: "Uranus",
        optionB: "Saturnus",
        optionC: "Mars",
        optionD: "Jupiter",
        correctOption: "optionD"
    },

    {
        question: "Apa sungai terpanjang didunia?",
        optionA: "Sungai Nil",
        optionB: "Bengawan Solo",
        optionC: "Sungai Niger",
        optionD: "Danau Chad",
        correctOption: "optionA"
    },

    {
        question: "Konstantinopel ditaklukan oleh?",
        optionA: "Kemal Ataturk",
        optionB: "Uncle Muthu",
        optionC: "Mehmed II",
        optionD: "Soekarno",
        correctOption: "optionC"
    },

    {
        question: "Komputer yang bisa dibawa-bawa adalah?",
        optionA: "Laptop",
        optionB: "Komputer",
        optionC: "TV",
        optionD: "Konsol",
        correctOption: "optionA"
    },

    {
        question: "Dimanakah teks Proklamasi Kemerdekaan Indonesia dibacakan?",
        optionA: "Istana Merdeka",
        optionB: "Gedung Sate",
        optionC: "Lapangan Ikada",
        optionD: "Rumah Soekarno, Jalan Pegangsaan Timur 56",
        correctOption: "optionD"
    },

    {
        question: `Shika dalam bahasa Jepang berarti?`,
        optionA: "Kucing",
        optionB: "Gajah",
        optionC: "Tokek",
        optionD: "Rusa",
        correctOption: "optionD"
    },

    {
        question: "Dimanakah tempat gedung tertinggi didunia?",
        optionA: "Afrika",
        optionB: "California",
        optionC: "Dubai",
        optionD: "Italia",
        correctOption: "optionC"
    },

  
    {
        question: "Sarada anak siapa?",
        optionA: "Sasuke & Sakura",
        optionB: "Naruto & Hinata",
        optionC: "Orochimaru",
        optionD: "Tenten",
        correctOption: "optionA"
    },

    {

        question: "Siapakah Hokage Ketiga dari Konoha?",
        optionA: "Hashirama Senju",
        optionB: "Minato Namikaze",
        optionC: "Tobirama Senju",
        optionD: "Hiruzen Sarutobi",
        correctOption: "optionD"
    },

    {

        question: "Boruto dan Himawari cucunya siapa?",
        optionA: "Naruto & Hinata",
        optionB: "Fugaku & Mikoto",
        optionC: "Eren Yeager",
        optionD: "Minato & Kushina",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Coba lagi"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Lumayan"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Kamu genius!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}