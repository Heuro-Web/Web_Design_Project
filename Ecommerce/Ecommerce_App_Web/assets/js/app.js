// const navigationBtn = document.querySelector(".categories_content_type")
// let backBtn = document.getElementById('backBtn')
// let nextBtn = document.getElementById('nextBtn')

// navigationBtn.addEventListener('wheel', (e)=>{
//     e.preventDefault()
//     // console.log(e);
//     navigationBtn.scrollLeft += e.deltaY;
// })
// nextBtn.addEventListener('click', ()=>{
//     navigationBtn.scrollLeft += 805
//     navigationBtn.style.scrollBehavior = "smooth"
// })
// backBtn.addEventListener('click', ()=>{
//     navigationBtn.scrollLeft -= 805
//     navigationBtn.style.scrollBehavior = "smooth"
// })


// Activer le Header a 50px

const header = document.querySelector(".header")
window.addEventListener('scroll', ()=>{
    window.scrollY > 30 ? header.classList.add('show_') : header.classList.remove('show_') 
})

// Changer les images automatiquement

const ALL_images = document.querySelectorAll('.category_item img')
let index = 0

setInterval(() => {
    ALL_images[index].classList.remove("active")
    index = (index + 1) % ALL_images.length
    ALL_images[index].classList.add("active")
}, 5000);

// Selectionner les types des categories

const categories_select = document.querySelectorAll('.categories_content')
function Select_categories(product) {
    for(let product_select of categories_select){
        product_select.classList.remove('open')
    }
    document.getElementById(product).classList.add('open')
}


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
const add_to_wishList = document.querySelector('.add_to_wishlist')
const close_card = document.querySelector('.close_icon')
const close_whishlist = document.querySelector('.close_wishlist')
const wishlist_added_prod = document.querySelector(".wishlist_content")
// const delete_product = document.querySelectorAll('.close_icon_product')
// const content_card_product = document.querySelectorAll('.card_content')
open_card.addEventListener('click', ()=>{
    card_content.classList.add("open")
    close_card.classList.add('open')
})
close_card.addEventListener('click', ()=>{
    card_content.classList.remove("open")
    close_card.classList.remove('open')
})

add_to_wishList.addEventListener("click", ()=>{
    wishlist_added_prod.classList.add('open')
    close_whishlist.classList.add('open')
})

close_whishlist.addEventListener('click', ()=>{
    wishlist_added_prod.classList.remove('open')
    close_whishlist.classList.remove('open')
})


// Open WISHLIST

// Selectionner le bouton pour ouvirr

const data_notif_wishlist = document.querySelector('.wishlist_data')
// console.log(data_notif_wishlist, "c'est le data wish");
let data_notif_count = 0

document.addEventListener('DOMContentLoaded', ()=>{

    const all_BUTTON_WISHlIST = document.querySelectorAll('.add_to_wishlist')
    for(let wish of all_BUTTON_WISHlIST){
        // console.log('les boutons sont : ', wish);
        wish.addEventListener('click', (e)=>{
            e.preventDefault()
            e.stopPropagation()

            let Classe_MainWish = wish.closest('.product_item')
            if(!Classe_MainWish){
                console.error("Cette classe de wish list n'existe pas", Classe_MainWish);
            }
            else{
                // console.error("la classe "+Classe_MainWish+ " existe");
                let image_ = Classe_MainWish.querySelector('.product_img.default').src
                let titre = Classe_MainWish.querySelector('.product_title').textContent
                let categorie = Classe_MainWish.querySelector('.producut_category').textContent
        
                // Creer Une classe pour les nouveaux elements

                let NouvelleClasse = document.createElement('div')
                NouvelleClasse.className = 'wishlist_new'
                NouvelleClasse.innerHTML = `
                        
                            <div class="wishlist_added_content">
                                <img src="${image_}" alt="" class="image_wishlist">
                                <div class="about_wishlist_content">
                                    <div class="title_wishlist">${titre}</div>
                                    <p class="categorie_wishlist">Categorie : ${categorie}</p>
                                </div>
                            </div>
                            <div class="remove_wishList">
                                <span class="remove_wishlist_button"><ion-icon name="trash-outline"></ion-icon></span>
                            </div>

                
                `
                
                wishlist_added_prod.appendChild(NouvelleClasse)
                data_notif_count += 1
                data_notif_wishlist.textContent = data_notif_count
                console.log("le compte est : ",data_notif_count);
                
                const deleteWishList_content = NouvelleClasse.querySelectorAll('.remove_wishlist_button')
                for(let Wishlish_delete of deleteWishList_content){
                    Wishlish_delete.addEventListener('click', ()=>{
                        NouvelleClasse.remove()
                        data_notif_count -= 1
                        data_notif_wishlist.textContent = data_notif_count
                    })
                }
                
            }
        })
        
    }
})




// Delete products


// for(let delete_prod of delete_product){
//     delete_prod.addEventListener('click', (e)=>{
//         e.stopPropagation()
//     let content_card_product = delete_prod.closest('.card_content')
//     console.log("carte trouve : ", content_card_product);
//     content_card_product.remove()
// })
// }

// PARTIE FOR ADDING BOX TO CARD

const data_add_card = document.querySelector('.card_data')
let data_add_card_count = 0
document.addEventListener('DOMContentLoaded', ()=>{
    const ADD_TO_CARD_BUTTON = document.querySelectorAll('.card_btn')
    const CONTENT_DATA_ADDED = document.querySelector('.card_content_details')
    let total_franc = document.querySelector('.total_franc')
    let total_dollars = document.querySelector('.total_dollars')
    let total_prix = 0
    for(let button_add of ADD_TO_CARD_BUTTON){
        button_add.addEventListener('click', (e)=>{
        e.preventDefault()
        e.stopPropagation()

        // Selectionner le contenu present dans le html
        let content_to_add = button_add.closest('.product_item')
        if(!content_to_add){
            console.error("Impossible de trouver ce produit :", content_to_add)
            return
        }
        // Prendre l'image
        const Image_content = content_to_add.querySelector('.product_img.default').src
        const Title_contenu = content_to_add.querySelector('.product_title').textContent
        let prix_int = content_to_add.querySelector('.new_price').textContent
        const oldprix = content_to_add.querySelector('.old_price').textContent
        const categorie_card_product = content_to_add.querySelector('.producut_category').textContent

        let card_content_prod = document.createElement('div')
        card_content_prod.className = 'card_content'
        card_content_prod.innerHTML = `
            <div class="card_images">
                <img src="${Image_content}" alt="">
            </div>
            <div class="card_details">
                <h2 class="categorie_card_product">${categorie_card_product}</h2>
                <h3 class="card_detail_title">${Title_contenu}</h3>
                <div class="card_content_price">
                    <span class="proposition_newPrice">${prix_int}</span>
                    <span class="proposition_oldPrice">${oldprix}</span>
                </div>
            </div>
            <span class="close_icon_product">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
        
        `
        // console.log(prix);
        CONTENT_DATA_ADDED.appendChild(card_content_prod)
        let price = parseFloat(prix_int.replace('$', ""))
        total_prix += price

        
        // total_franc = parseFloat((total_prix * 3000))
        console.log(total_prix);
        total_dollars.textContent = total_prix.toFixed(2)
        // console.log(prix_int);
        // console.log(total_dollars);
        data_add_card_count += 1
        data_add_card.textContent = data_add_card_count
        // console.log("Le count de data card added : ", data_add_card_count);
        
        
        

        const btn_Close_Product = card_content_prod.querySelector('.close_icon_product')
        btn_Close_Product.addEventListener('click', (e)=>{
            e.stopPropagation()
            card_content_prod.remove()
            total_prix -= price
            total_dollars.textContent = total_prix.toFixed(2)
            data_add_card_count -= 1
            data_add_card.textContent = data_add_card_count

        })
        console.log(btn_Close_Product);
        
        })
    }
})



// 