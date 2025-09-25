// Convertir une chaine de car en tableau

let chaine = "nom,post,prenom,color, sot"
// Scindez les valeurs par la virgule

let nouveau_tab = chaine.split(",")
// longueur du tab
const longueur = nouveau_tab.length
console.log(longueur)

// Affichons quelques elements

console.log(nouveau_tab[0])
console.log(nouveau_tab[1])
console.log(nouveau_tab[2])

// Chargez les elements avec une boucle

for(var i = 0; i< nouveau_tab.length; i ++){
    console.log("l'element ",i,"est : ",nouveau_tab[i])
}