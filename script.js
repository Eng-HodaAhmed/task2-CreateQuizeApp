const View = (() => {

    const sellector = {
        start: document.querySelector('.start'),
        startBtn: document.querySelector('.startBtn'),
        displayContainer: document.querySelector('.displayContainer'),
        questionNum: document.querySelector('.count'),
        timeLeft: document.querySelector('.timeLeft'),
        question: document.querySelector('.question'),
        answer: document.querySelector('.answer'),
        nextBtn: document.querySelector('.nextBtn'),
        score: document.querySelector('.score'),
        img: document.querySelector('.img'),
        scoreContainer: document.querySelector('.scoreContainer'),
        closeBtn: document.querySelector('.close')
    };
    const setter = {
        setQuestionNum(num) {
            sellector.questionNum.innerHTML = `<p>${num} of 5 questions</p>`;
        },
        setQuestion(data) {

            sellector.question.innerHTML = data.question;
        },
        setAnswer(data) {
            let answerHtml = "";
            for (i = 0; i < data.options.length; i++) {
                answerHtml += `
                <tr style="background-color:rgb(239, 239, 239);width:100%;display:inline-block;margin-bottom:5px;" >
                    <td style="padding:7px 5px;"><input  type="radio" class="radio" style="vertical-align: middle; margin-right:7px;" id="option" value='${data.options[i]}' name="answer">
                        <label for="option" class="lable">${data.options[i]}</label>
                    </td>
                </tr>`
            }
            sellector.answer.innerHTML = answerHtml;
        },
       
        startTimer() {
            let i = 5
             let time = setInterval(() => {
                sellector.timeLeft.innerHTML = `${i}`;
                i--;
                if (i < 0) {
                    let radio=document.querySelectorAll('.radio');
                    let label=document.querySelectorAll('.lable')
                    console.log(label)
                    radio.forEach(element => {
                        element.disabled=true;
                        // element.classList.add('disabled')
                    });
                    label.forEach(element => {
                        element.classList.add('disabled')
                    });
                    clearInterval(time);
                
                }
            }, 1000)
            return time;
        },
        setResult(score) {
            if (score >= 3) {
                sellector.img.classList.add("succsess")
                sellector.score.innerHTML = `<p style="padding-top:25%; margin-bottom:10px;color:green;font-size:18px;font-weight:bold">YOU ARE WINNER...</p>
                 <p>YOUR SCORE IS: ${score}</p>`;
            }
            else {
                sellector.img.classList.add("fail")
                sellector.score.innerHTML = `<p style="padding-top:25%; margin-bottom:10px;color:red;font-size:18px;">TRY AGAIN...</p>
                 <p>YOUR SCORE IS: ${score}</p>`;
            }
        }
    };
    const getter = {
        getStartScreen() {
            return sellector.start
        },
        getStartBtn() {
            return sellector.startBtn
        },
        // getQuestionNum(){
        //     return sellector.questionNum;
        // },
        getTimeLeft() {
            return sellector.timeLeft;
        },
        getNextBtn() {
            return sellector.nextBtn;
        },
        getCloseBtn() {
            return sellector.closeBtn;
        },
        getDisplayContainer() {
            return sellector.displayContainer
        },
        getScoreContainer() {
            return sellector.scoreContainer
        },
        getAnswer() {
            var ele = document.getElementsByName("answer");
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked) {
                    return ele[i].value;
                }
            }
            return false;
        }



    }
    return {
        setter,
        getter
    }
})();

const Store = (() => {
    const quizeArr = [
        {
            id: "1",
            question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            options: [`script name="xxx.js"`, `script src="xxx.js"`, `script href="xxx.js"`],
            correct: 'script src="xxx.js"'
        },
        {
            id: "2",
            question: "How do you create a function in JavaScript?",
            options: ["function=myFunction()", "function:myFunction()", "function myFunction()"],
            correct: "function myFunction()"
        },
        {
            id: "3",
            question: "How to write an IF statement in JavaScript?",
            options: ["if(i==5)", "if(i=5)", "if(i==5)then"],
            correct: "if(i==5)"
        },
        {
            id: "4",
            question: "How does a FOR loop start?",
            options: ["for(i=0,i<=5,i++)", "for i=1 to 5 ", "for(i=0;i<=5;i++)"],
            correct: "for(i=0;i<=5;i++)"
        },
        {
            id: "5",
            question: "How do you round the number 7.25, to the nearest integer?",
            options: ["rnd(7.25)", "Math.round(7.25)", "Math.rnd(7.25)"],
            correct: "Math.round(7.25)"
        },

    ]

    const setter = {

    }
    const getter = {
        getQuestionsLen() {
            return quizeArr.length;
        },
        getQuestionData(id) {
            return quizeArr[--id];
        }

    }
    return {
        setter,
        getter
    }
})();

const Controler = (() => {
    var score = 0;
    let time;

    let questionNum = 1;

    const displayNext = () => {
        let data = Store.getter.getQuestionData(questionNum);
        View.setter.setQuestion(data);
        View.setter.setAnswer(data);
        questionNum++;
    }

    const checkAns=()=>{
        let preData = Store.getter.getQuestionData(questionNum - 1);
        let ans = View.getter.getAnswer();
        if (ans != false) {
            if (preData.correct == ans) {
                score++;

            }
        }
    }
    const init = () => {

        View.getter.getStartBtn().addEventListener('click', function () {
            time=View.setter.startTimer();
            View.setter.setQuestionNum(questionNum);
            View.getter.getStartScreen().classList.add('hide');
            View.getter.getDisplayContainer().classList.remove('hide');
            displayNext();
    
        })
        View.getter.getNextBtn().addEventListener('click', function () {
            checkAns();
            clearInterval(time);
            let len = Store.getter.getQuestionsLen();
            if (questionNum <= len) {
                time=View.setter.startTimer();
                View.setter.setQuestionNum(questionNum);
                let data = Store.getter.getQuestionData(questionNum);
                View.setter.setQuestion(data);
                View.setter.setAnswer(data);
                questionNum++;
                // console.log(score);
            }

            else {
                View.setter.setResult(score);
                View.getter.getScoreContainer().classList.remove('hide');
                View.getter.getDisplayContainer().classList.add('hide');
            }

        })

        View.getter.getCloseBtn().addEventListener('click', function () {
            questionNum=1;
            score=0;
            View.getter.getScoreContainer().classList.add('hide');
            View.getter.getStartScreen().classList.remove('hide');

        })

    }
    return {
        init
    };
})();

Controler.init();