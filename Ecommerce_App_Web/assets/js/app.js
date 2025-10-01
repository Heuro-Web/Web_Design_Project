const navigationBtn = document.querySelector(".categories_content_type")
let backBtn = document.getElementById('backBtn')
let nextBtn = document.getElementById('nextBtn')

navigationBtn.addEventListener('wheel', (e)=>{
    e.preventDefault()
    // console.log(e);
    navigationBtn.scrollLeft += e.deltaY;
})
nextBtn.addEventListener('click', ()=>{
    navigationBtn.scrollLeft += 1010
    navigationBtn.style.scrollBehavior = "smooth"
})
backBtn.addEventListener('click', ()=>{
    navigationBtn.scrollLeft -= 1010
    navigationBtn.style.scrollBehavior = "smooth"
})

// Les buttons de changement

// Button
// const button = document.querySelectorAll('[data-target]'),
const tabContent = document.querySelectorAll('[content]')
const button_o = document.querySelectorAll('.btnChange')
function DataProduct(id, btn){
    for(let content of tabContent){
        content.classList.remove("active_tab")
    }
    document.getElementById(id).classList.add("active_tab")
    for(let btn of button_o){
        btn.classList.remove('colored')
    }
    btn.classList.add("colored")
}

// for(let but of button){
//     but.addEventListener('click', ()=>{
//         const target = document.querySelector(but.dataset.target)
//         // console.log(target);
//         for(let Tabcont of tabContent){
//             Tabcont.classList.remove("active_tab")
//         }
//         target.classList.add('active_tab')
        
//     })
// }

// Open Card

const card_content = document.querySelector('.card_product_content')
const open_card = document.querySelector('.card_outline')
const close_card = document.querySelector('.close_icon')
const delete_product = document.querySelectorAll('.close_icon_product')
// const content_card_product = document.querySelectorAll('.card_content')
open_card.addEventListener('click', ()=>{
    card_content.classList.add("open")
    close_card.classList.add('open')
})
close_card.addEventListener('click', ()=>{
    card_content.classList.remove("open")
    close_card.classList.remove('open')
})

// Delete products


for (let delete_prod of delete_product){
    delete_prod.addEventListener('click', (e)=>{
        e.stopPropagation()
    let content_card_product = delete_prod.closest('.card_content')
    console.log("carte trouve : ", content_card_product);
    content_card_product.remove()
})
}

