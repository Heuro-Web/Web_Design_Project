// Creer une function

function Hello(){
    console.log("Hello tout le monde")
}
function call(nom, age){
    console.log(`Vous etes ${nom} et votre age est : ${age} ans`)
}

//  Regular functiion

function calculer(operateur, a, b){
    if(operateur == "+"){
        return a + b
    }
    else if(operateur == "/"){
        if(b === 0){
            return "Erreur de division"
        }
        else{
            return a / b
        }
    }
    else{
        return "Y a une erreur"
    }
}

// Arrow fuunction

const fonction = (a, b) =>{
    return a + b
}


Hello()
call("Noble", 12)
console.log(calculer("+", 23, 23))
console.log(calculer("/", 23, 0))
console.log(fonction(11,3))

// Fonction pour lire les contenus d'un tableau

let a = [234,245,-5, 7899,888, -3]

// Une fonction
const table = (elements_du_tableau) =>{
    // Pour tout element de a
    let GrandNombre = 0
    for(const item of elements_du_tableau){
        // console.log(item)

        // Recuperer le grand nombre
        if(item > GrandNombre){
            GrandNombre = item
        }
        
    }
    return GrandNombre
}
// table(a)
const grandNmb = table(a)
console.log("le grand nombre est : ",grandNmb)

// Une fonction pour multiplier chaque nombre du tab par 2

const fonctionTwo = (arr) =>{
    for(let i = 0; i < a.length ; i++){
        arr[i] *= 2
    }
    console.log(arr)
}
fonctionTwo(a)
// Nous voyons que notre fonction arr a modifie notre fonction principal
// Alors corrrigins

// IMPERATIF

console.log(a)

const corriger = (t) =>{
    let copie_elemts = [...t]
    for(let l = 0; l < copie_elemts.length; l ++){
        copie_elemts[l] *= 2
    }
    return copie_elemts
}


console.log(corriger(a))
// Et la nous voyons que la fonction n'a pas modifie
a

// DECLARATIF

const declaratif =  a.map(n => n * 2)
// On vient de remplacer tous les 5 lignes par une
declaratif

// Afficher seulement les nombres positifs

const positiftNumber = a.filter((POSITIF) => POSITIF > 0)
positiftNumber
// Verifier si tous les nombres du tab sont > 0

const AllEven = a.every(nombre  => nombre > 0)
AllEven

// Verifier si quelques uns des nombres du tab sont > a un nombre

const Some =a.some((elemnt) => elemnt > 345)
Some