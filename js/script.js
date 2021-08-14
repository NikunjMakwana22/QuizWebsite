//Start Section
let start = document.querySelector("#startSection");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let showans = document.querySelector("#show_answers");
let showansscreen=document.querySelector("#quiz_ans");

let questionNo_ans = document.querySelector("#questionNo_ans");
let questionText_ans = document.querySelector("#questionText_ans");
let option1_ans = document.querySelector("#option1_ans");
let option2_ans = document.querySelector("#option2_ans");
let option3_ans = document.querySelector("#option3_ans");
let option4_ans = document.querySelector("#option4_ans");
let next_question_ans = document.querySelector("#next_question_ans");


let correctIcon=[];
correctIcon[0] = document.querySelector("#option1_ans_icon");
correctIcon[1] = document.querySelector("#option2_ans_icon");
correctIcon[2] = document.querySelector("#option3_ans_icon");
correctIcon[3] = document.querySelector("#option4_ans_icon");

let correctIconColor=[];
correctIconColor[0] = document.getElementById("#option1_ans_main");
correctIconColor[1] = document.getElementById("#option2_ans_main");
correctIconColor[2] = document.getElementById("#option3_ans_main");
correctIconColor[3] = document.getElementById("#option4_ans_main");




//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");
let index = 0;
let timer = 20;
let interval = 0;
let answergiven=[];
let currentans;
let answerselected=false;
//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;

//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


showans.addEventListener("click",() =>{
    result.style.display="none";
    showansscreen.style.display="block";
    index=0;
    loadansData();
});

//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 0) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer--;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);

let loadData = () => {
    time.innerText = timer;
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 20;
    time.innerText = timer;
    
}

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })
    total_correct.style.display = "block";
    total_correct.innerHTML = `${index+1} / ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        answerselected =true;
        if (choiceNo === MCQS[index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        currentans=choiceNo+1;
        //stop Counter
        clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
   if(answerselected)
   {
  
    answergiven.push([currentans,index]);
   }
   else
   {
   answergiven.push([0,index]);

   }
    answerselected=false;
 
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${index+1} / ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        result.style.display = "block";
        console.log(answergiven);
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
});

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
    location.reload();
});

//Start Again When 'Start Again' Button Will Clicked
/*startAgain.addEventListener("click", () => {
    guide.style.display = "block";
    result.style.display = "none";
});*/




let loadansData = () => {
    questionText_ans.innerText = MCQS[index].question;
    option1_ans.innerText = MCQS[index].choice1;
    option2_ans.innerText = MCQS[index].choice2;
    option3_ans.innerText = MCQS[index].choice3;
    option4_ans.innerText = MCQS[index].choice4;
   for(i=0;i<=3;i++)
   {
       if(i == MCQS[index].answer)
       {
           correctIcon[i].innerText = "Correct";
       }
       else
       {
           correctIcon[i].innerText="";
       }
   }
}

loadansData();



next_question_ans.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== MCQS.length - 1) {
        index++;
        loadansData(); 
        } 
        else {
        index = 0;
        //when Quiz Question Complete Display Result Section
        showansscreen.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        result.style.display = "block";
    }
});












