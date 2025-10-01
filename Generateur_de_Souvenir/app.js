const api = "https://api.quotable.io/random"
const quote = document.getElementById('quote')
const author = document.getElementById('author')
async  function GetQuote(url){
    const reponse = await fetch(url) 
    let data = await reponse.json()
    console.log(data); 
    quote.textContent = data.content
    author.textContent = data.author
}

