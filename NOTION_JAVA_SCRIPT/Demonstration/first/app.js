function Verifier_age(event){
    event.preventDefault()
    const age = document.querySelector('#age').value
    let warning = ''
    let message = document.querySelector('.message')

    if(isNaN(age)){
        alert('erreur')
    }
    else{
        if(age < 10){
            warning = "Vous etes eencore petit"
        }
        else{
            warning = "Vous etes grand"
        }
    }
    message.textContent = warning
    document.querySelector('#age').value = ''
}

let conte = 0
function Plus(){
    conte ++
    document.querySelector('.count').textContent = conte
}
function Moins(){
    conte --
    document.querySelector('.count').textContent = conte
}

function Taches(){
    const taches_list = document.querySelector('.taches')
    let input = document.querySelector('#input_tache').value

    let li = document.createElement('li')
    if (input === ''){
        // li.textContent = 'vide'
        taches_list.removeChild(li)
        alert("Vous devez note quelque chose")
    }
    else{
        li.textContent = input
    }
    taches_list.appendChild(li)
    document.querySelector('#input_tache').value = ''
}

function calculer(signe){
    const n1 = parseFloat(document.querySelector('#n1').value) 
    const n2 = parseFloat(document.querySelector('#n2').value)
    let resulat = ''

    if(isNaN(n1) || isNaN(n2)){
        alert("Les caracteres ne sont pas pris en charge")
        resulat = 'Null'
    }
    else{
        switch (signe) {
            case '+':
                resulat = n1 + n2
                break;
            case '-':
                resulat = n1 - n2
                break;
            case '/':
                resulat = n1 / n2
                break;
            case '*':
                resulat = n1 * n2
                break;
            default:
                alert("Le signe n'est pas pris en charge")
                break;
        }
    }
    document.getElementById('resulat').textContent =  resulat
    document.querySelector('#n1').value = ''
    document.querySelector('#n2').value = ''
}

// Partie Quiz


const elemts = [
        {
            q : "Quel est ton nom ",
            r : ''
        },
        {
            q : "la balise principale du Html",
            r : "html"
        },
        {
            q : "comment declarer une variable en java",
            r : "int"
        }
    ]
let Quizdiv = document.getElementById('quiz')
elemts.forEach((item, i) =>{
        Quizdiv.innerHTML += `
            <p> ${item.q}
            <input type='text' id='reponse${i}'/>   `
    })

function CalculerScore(){
    let score = 0
    elemts.forEach((item, index) =>{
        const reponse = document.getElementById('reponse'+index).value.trim()
        if(reponse.toLowerCase() || item.r.toLowerCase()){
            score ++
        }
        document.querySelector('.score').textContent = (score / elemts.length)
    })
}

// Chrono

let interval
let compte = 0
function demarrer(){
    if(!interval){
        interval = setInterval(() => {
            compte ++
            document.querySelector('#chrono').textContent = compte
        }, 1000);
    }
}

function Arreter(){
    clearInterval(interval)
    interval = null
    document.querySelector('#start').textContent = 'Continuer'
}
function Reset(){
    compte = 0
    document.querySelector('#chrono').textContent = compte
    Arreter()
}