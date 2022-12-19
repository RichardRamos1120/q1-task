
document.addEventListener("DOMContentLoaded",()=>{


    if(typeof HTMLDocument !== "undefined"){
        HTMLDocument.prototype.questionAndAnswer = () =>{
                //this is the questions list, you can add 
                this.questionList = [
                    {
                        title:"Have you graduated high school or have you earned a GED?",
                        choice:{
                            a:"yes",
                            b:"no"
                        }
                    },
                    {
                        title:"Have you decided on which Fire Academy you'd like to attend?",
                        choice:{
                            a:"yes",
                            b:"no"
                        }
                    },
                    
                    
                ]
                // this is the feeback to the user previous answer
                this.answerList = {
                    0:[
                        `Great job! You've accomplished the first step on your pathway!`,
                        
                        `<span class="primary-text">No problem, your first step is to complete your GED.</span>
                        <span class="secondary-text">Google GED programs in your city or call your local community college to figure out what resources are available to help you accomplish the first step!</span>`
                    ],
                    1:[
                        `Fantastic, check out the pre-requisites for your fire academy and speak to their coordinator to learn what you need to do before you can enroll and what dates are important for applying. Tell us which Academy you'd like to attend below and we'll store it for your pathway document!`,
                        
                        `
                        No problem! If you're in California, check out this link from the State Fire Marshall that <a href='https://osfm.fire.ca.gov/divisions/state-fire-training/accredited-academies/'>links all of the accredited academies</a> here. Reach out to the coordinator of the academy of your choice by phone and email and make an appointment to speak with them to figure out what you'll need to apply. After clicking the link, tell us which academies sound the most interesting to you. We'll include it in your pathway document!`
                    ]
                }
        }
    }
   
  
})