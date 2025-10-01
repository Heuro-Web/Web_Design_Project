let productImg = document.getElementById('product_img')
let btn = document.querySelectorAll('.btn')

btn[0].onclick = function(){
    productImg.src = "./assets/images/d3.jpg"
    for(let bt of btn){
        bt.classList.remove('active')
    }
    this.classList.add('active')
}
btn[1].onclick = function(){
    productImg.src = "./assets/images/d2.jpg"
        for(let bt of btn){
        bt.classList.remove('active')
    }
    this.classList.add('active')
}
btn[2].onclick = function(){
    productImg.src = "./assets/images/d1.jpg"
        for(let bt of btn){
        bt.classList.remove('active')
    }
    this.classList.add('active')
}