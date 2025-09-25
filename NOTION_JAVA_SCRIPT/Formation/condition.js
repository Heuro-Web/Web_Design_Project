let condition = "Condition"
// La variable condition vide retourne false
if (condition){
    console.log("Is True")
}
else{
    console.log("Is False")
}

let nom = ""
if (nom){
    nom = "positif"
}
else{
    nom = "negatif"
}

console.log("Votre nom est devenu ", nom)

// Condition avec == et ===

// == verifie seulement les valeurs s'elles sont les memes mais 
// ===verifie et les les valeurs et le type des donnees

nom = '12'
let chiffre = 12
if(nom == chiffre){
    console.log('Ici nous verifions surtout les valeurs')
}
else{
    console.log('faux')
}

nom = '13'
chiffre = 13
if(chiffre === nom){
    console.log("Ici nous verifions strictement le type des  donnees")
}
else{
    console.log("C'est faux la condition")
}

// Superieur ou inf

let nombre_sup = 200
if(nombre_sup < 12){
    console.log("Le nombre est inferieur a 12")
}
else if(nombre_sup > 13){
    console.log("C'est superieur a 13")
}
else if(nombre_sup <= 200){
    console.log("j'ai trouve le bon nombre")
}
else{
    console.log("Y a rien de nombre trouve")
}
// Et , OU

nombre_sup = 10
nom = "muribisha"

if (nombre_sup === 10 || nom.length ){
    console.log("La condition fonctionne")
}else{
    console.log("La condition echoue")
}

// Condition ternaire


const nom_user = nom.length < 12  ? "Vous etes valide" : "Votre age est bizarre"
console.log(nom_user)