document.addEventListener("DOMContentLoaded",()=>{

    // load the questions and answers from questions.js
    document.questionAndAnswer();
    let myQuestions = this.questionList;
    let myAnswers = this.answerList
    const userAnswer = [];
    let currentAnsw = "Yes";


    const questionBox = document.querySelectorAll(".question-box");
    const containerBox = document.querySelector(".container");
    const btnStart = document.querySelector("#btn-start");
    btnStart.addEventListener("click",()=>{
        btnStart.parentNode.classList.add("hidden")
        btnStart.parentNode.nextSibling.classList.remove("hidden")
    })



    // create the element question to parse into the dom
    myQuestions.forEach((question,key)=>{
        const a = question.choice.a.charAt(0).toUpperCase() + question.choice.a.slice(1);
        const b = question.choice.b.charAt(0).toUpperCase() + question.choice.b.slice(1);
        
        const questionBoxs = document.createElement("div");
        questionBoxs.classList.add(`question-box`,`q${key}`,`answer-box`,`hidden`);
        questionBoxs.dataset.val = key;

        questionBoxs.innerHTML = `
        <h2 class="main-title answer-title">${question.title}</h2>
        <input type="hidden" id="answ${key}">
        <ul class="main-answer-ul">
            <li class="main-answer-li"><a href="#" class="answer-yes answer-btn" data-val="${key}">${a}</a></li>
            <li class="main-answer-li"><a href="#" class="answer-no answer-btn"  data-val="${key}">${b}</a></li>
        </ul>
        <button class="btn-question next-btn" id="next-btn-${key}"  data-current="${key}">Next</button>`

        containerBox.append(questionBoxs)
        
    })

        // create the element question feedback to parse into the dom based on the
    //user answer
    for(key in myAnswers){

        // when user answered yes
        console.log(key)
        const questionBoxYes = document.createElement("div");
        questionBoxYes.classList.add(`question-box`,`feed${key}`,`feeb-box`,`hidden`);
        questionBoxYes.dataset.feed = key;
        questionBoxYes.innerHTML = `
        <h2 class="main-title answer-title">${myAnswers[key][0]}</h2>
        <button class="btn-question continue-btn continue-btn-true continue-btn-${key}"  data-feedCurrent="${key}"  data-bool="true">Continue</button>`
        containerBox.append(questionBoxYes)

        // when user answered no
        
        const questionBoxNo = document.createElement("div");
        questionBoxNo.classList.add(`question-box`,`feed${key}`,`feeb-box`,`hidden`);
        questionBoxNo.dataset.feed = key;
        questionBoxNo.innerHTML = `
        <h2 class="main-title answer-title">${myAnswers[key][1]}</h2>
        <button class="btn-question continue-btn continue-btn-false" continue-btn-${key}  data-feedCurrent="${key}" data-bool="false">Continue</button>`
        containerBox.append(questionBoxNo)
    }

   


    // answeredBg toggler
    let answerBtn = document.querySelectorAll(".answer-btn");
    answerBtn.forEach((btn,key,el)=>{
        btn.addEventListener("click",(e)=>{
            e.preventDefault();
            el.forEach(x=>{x.classList.remove("answeredBg")})
            btn.classList.add("answeredBg")
            currentAnsw = btn.innerText;

    
            // change the value of the user answer 

            userAnswer[ btn.getAttribute("data-val") ] = currentAnsw;
            console.log(userAnswer)
          
            
        })
    })



    // hide the current question box and show the next one
    let nextBtn = document.querySelectorAll(".next-btn");
    let continueBtn = document.querySelectorAll(".continue-btn")
    let continueBtnTrue = document.querySelectorAll(".continue-btn-true");
    let continueBtnFalse = document.querySelectorAll(".continue-btn-false");
    let currentNextKeyBtn = 0;
    let currentQuestion = 0;
    let currentContinueBtn = 0;
    let isAccessed = 0;
    
    // when next button is press
    for(let i=0;i<myQuestions.length;i++){
        let currentBtn = document.getElementById(`next-btn-${i}`);
        let nextBtn = document.getElementById(`next-btn-${i + 1}`);

        

        currentBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            currentBtn.parentElement.classList.add("hidden");

            if(currentAnsw == "yes" | currentAnsw == "Yes"){
                currentContinueBtn = continueBtnTrue[i];
                continueBtnTrue[i].parentElement.classList.remove("hidden");
            }
            else{
                currentContinueBtn = continueBtnFalse[i];
                continueBtnFalse[i].parentElement.classList.remove("hidden");
            }


            currentContinueBtn.addEventListener("click",()=>{
                currentContinueBtn.parentElement.classList.add("hidden")


                if(!nextBtn){
                    currentContinueBtn.parentElement.classList.remove("hidden")
                    currentContinueBtn.innerText =  "Download A Copy";
                    currentContinueBtn.id = `downloadACopyBtn`;

                

                    // add event to the download copy button and remove all the event from the previous
                    //button
                    ++isAccessed;
                    if(isAccessed == 1){

                        const generatePdf = () =>{
                            const elementPdf =  document.querySelector("#toPdfElement");
       

                            html2pdf().from(elementPdf).save(0)
                        }
                        
                        currentContinueBtn.addEventListener("click",()=>{
        
                            generatePdf()

                        })
                        
                    }
              

                    // clear this area first 
                    let theDiv = currentContinueBtn.parentElement.querySelector(".main-title");
                    theDiv.id = "toPdfElement";
                    theDiv.innerHTML = `Thank you! Here is a copy of your answers.`

                    
                    // then loop all the answers to the dom again to be converted into pdf
                    for(let i=0; i < userAnswer.length; i++ ){
                        theDiv.innerHTML += `<span class="seperator">${myQuestions[i].title}<span class="seperator-answer seperator-answer-${userAnswer[i]}">${userAnswer[i]}</span> </span>`;
                    }
                    
                    
                }
                else {
                    nextBtn.parentElement.classList.remove("hidden")
                }


            })


        })


    }
    
})

