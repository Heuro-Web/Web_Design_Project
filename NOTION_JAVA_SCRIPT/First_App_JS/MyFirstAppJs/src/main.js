import './style.css'
import { QUESTIONS } from './questions' 


const app = document.querySelector("#app")

const start_button = document.querySelector("#button")
start_button.addEventListener('click', StartQuiz)

function StartQuiz(event) {
  event.stopPropagation()
    let Question_Courante = 0
    let Score = 0

    effacer()
    AfficherQuestion(Question_Courante)

    function effacer(params) {
        while(app.firstElementChild){
          app.firstElementChild.remove()
        }
    }
    function AfficherQuestion(index_Q) {
        const Question = QUESTIONS[index_Q]

        if(!Question){
          // ..........
        }

        const title = RecupereQuestion(Question.question)
        app.appendChild(title)

        const DivReponse = CreateAnswers(Question.answer)
        app.appendChild(DivReponse)
    }
    function CreateAnswers(reponse) {
        const creerDivReponse = document.createElement('div')
        creerDivReponse.classList.add("reponse")

        for(const answer of reponse){
          const label = RecupereAnswer(answer)
          creerDivReponse.appendChild(label)
        }
        return creerDivReponse
    }

    function RecupereQuestion(text) {
      const titre_ = document.createElement('h3')
      titre_.innerText = text
      return titre_
    }

    function RecupereAnswer(text) {
      const label = document.createElement('label')
      label.innerText = text
      const input = document.createElement('input')
      const id = text.replaceAll("", "-").toLowerCase()

      input.id = id
      label.htmlFor = id

      input.setAttribute("type", "radio")
      input.setAttribute("name", "answer")
      input.setAttribute("value", text)

      label.appendChild(input)

      return label
    }
}


const body = document.querySelector('body')
const dark = document.querySelector("#dark")
dark.addEventListener('click', ()=>{
    body.style.background = 'black'
})