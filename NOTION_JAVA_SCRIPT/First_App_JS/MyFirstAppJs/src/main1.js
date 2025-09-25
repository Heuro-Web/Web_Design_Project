import './style.css'
const app = document.querySelector('#app')
// Essayons d'ajouter des elements dans l'id app


const div = document.createElement('div')
// div.innerHTML = "<p> Salut </p>"
// div.style.textAlign = 'center'
// const h1 = document.createElement('h1')
// h1.innerText = 'Bonjour'
const input = document.createElement('input')

// setInterval(() => {
//     input.value += 1
//     if (input.value == 1111){
//       input.value = 0
//     }
// }, 1000);

div.classList.add('myclass')
div.appendChild(h1)
div.appendChild(input)
app.appendChild(div)





// Pas cool
// app.innerHTML = `<p> Salut </p>`
















// app.style.background = 'red'

// Fonction pour mettre une pause

// setTimeout(() => {
//   app.style.background = 'red'
// }, 10000);

// Fonction pour l'intervalle de seconde

// const couleurs = ['red','blue', 'yellow', 'cyan']
// let i = 0
// setInterval(() => {
//     app.style.background = couleurs[i]
//     i ++
//     if(i > couleurs.length - 1){
//       i = 0
//     }
// }, 1000);

// console.log(
//     {
//       classeParent : app.parentElement,
//       enfants : app.children
//     }
// )

start_button.addEventListener('click',() =>{

    const paragraphe_Qu =  document.querySelector('#question') ?? document.createElement("p")
    paragraphe_Qu.id = 'question'
    paragraphe_Qu.innerText = questions[i].question
    paragraphe_Qu.style.textAlign = 'center'
    paragraphe_Qu.style.marginTop = '20px'
    // On lieu de faire ceci on doit ajouter la question avant le bouton
    // app.appendChild(paragraphe_Qu)
    app.insertBefore(paragraphe_Qu, start_button)

    i ++
    if(i > questions.length - 1){
      // Apres qu'on est a la fin on doit effacer le dernier element
      // console.log("Question Remove")
      paragraphe_Qu.remove(paragraphe_Qu)
      i = 0
    }
}