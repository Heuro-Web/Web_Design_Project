const content = document.querySelectorAll('[data-content]')
function Scroll(){
    for(let i = 0;i<content.length; i++){
        const IsElementScreen = content[i].getBoundingClientRect().top < window.innerHeight
        if(IsElementScreen){
            content[i].classList.add('scroll_active')
        }
        else{
            content[i].classList.remove('scroll_active')
        }


    }
}

window.addEventListener('scroll', Scroll)