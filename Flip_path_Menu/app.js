const classe_loader = document.querySelector('.loader')
document.body.classList.add('noscroll')
window.addEventListener('load', () =>{
    classe_loader.classList.add('close')
    document.body.classList.remove('noscroll')
})