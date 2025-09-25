const class_ = document.querySelector('.button_menu')
const bouton = document.querySelector('.button_menu img')
const affichage = document.querySelector('.menu-respo')

class_.onclick = function (){
    affichage.classList.toggle('open')
    const isOpen = affichage.classList.contains('open')
    bouton.classList = isOpen ? 'X' : '🟰'
}