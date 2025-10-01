const button_openNav = document.querySelector('.open_nav')
const navBar = document.querySelector('#navbar')

function toogleSubMenu(button){
    button.nextElementSibling.classList.toggle("open")
    if(navBar.classList.contains('close')){
        navBar.classList.toggle('close')
    }
}


function Open(){
    navBar.classList.toggle('close')

    Array.from(navBar.getElementsByClassName('open')).forEach(element => {
        element.classList.remove('open')
    });
}