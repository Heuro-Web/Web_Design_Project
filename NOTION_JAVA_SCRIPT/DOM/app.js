const box = document.querySelector('.box')
const btn1 = document.querySelector('#btn_1')
const btn2 = document.querySelector('#btn_2')
const reponse = document.querySelector('p')
const mousemouve = document.querySelector('.mousemove')

box.addEventListener('click', function(){
    // box.classList.toggle('click_event')
})
btn1.addEventListener('click', function(){
    reponse.classList.toggle('rdc_')
    reponse.style.color = 'blue'
    console.log(btn1)
})
btn2.addEventListener('click', function(){
    reponse.classList.toggle('rwanda_')
    reponse.style.color = 'red'
    console.log(btn2)
}) 

window.addEventListener('mousemove', (e)=>{
    mousemouve.style.left = e.pageX + 'px'  
    mousemouve.style.top = e.pageY + 'px'  
    // console.log(e.target)
})

window.addEventListener('mousedown', ()=>{
    mousemouve.style.transform = "scale(2)"
})

window.addEventListener('mouseup', ()=>{
    mousemouve.style.transform = "scale(1)"
})
// Entree
box.addEventListener("mouseenter", ()=>{
    box.style.background = 'green'
    console.log('in')
})
// sortie
box.addEventListener('mouseout', ()=>{
    box.style.background = 'pink'
    console.log("oui")
})
// sur element
reponse.addEventListener('mouseover', ()=>{
    reponse.style.transform = "rotate(5deg)"
})

// key press
const keypress = document.querySelector('.keypress')
const key = document.getElementById('key')

// play song

function playsong(){
    const audio = new Audio()
    audio.src = './alarm.mp3'
    console.log(audio.src)
    audio.play()
}
// playsong()

document.addEventListener('keypress', (e)=>{
    // console.log(e.key)
    key.textContent = e.key
    if(e.key === "j"){
        keypress.style.background = "pink"
    }
    else if(e.key === "h"){
        keypress.style.background = 'blue'
    }
    else if(e.key === " "){
        key.textContent = 'Espace'
        keypress.style.background = 'blue'
    }
    else{
        keypress.style.background = 'red'
    }
    // playsong()
})

// Scroll event

const nav = document.querySelector('nav')
window.addEventListener('scroll', ()=>{
    console.log("test !!!!!111")
    console.log(window.scrollY)
    if(window.scrollY > 12){
        nav.style.top = 0
    }else{
        nav.style.top = -50 + 'px'
    }
})  

// Input event

const inputName = document.querySelector('input[type="text"]')
const select = document.querySelector('select')
const form = document.querySelector('form')
const objet = document.querySelector('.objet')
const cvg = document.querySelector('#cvg')
let pseudo = ''
let langage = ''

console.log(inputName)
// voir ce qu'on ecrit sur clavier
inputName.addEventListener('input', (e)=>{
    // console.log('a clique')
    pseudo = e.target.value
    // console.log(e.target.value)
})
select.addEventListener('input', (e)=>{
    langage = e.target.value
})

// console.log(cvg.checked)

form.addEventListener('submit', (e)=>{
    // Annuler le comportemnt par defaut du navigateur
    e.preventDefault()
    console.log("cvg check : "+cvg.checked)
    if(cvg.checked){
        objet.textContent = `Le pseudo est : ${pseudo} 
                Le langage est : ${langage}`
    }
    else{
        alert("Veuillez accepeter les conditions")
    }
})

