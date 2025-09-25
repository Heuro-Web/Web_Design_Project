let MonTab = ["noble", "amisi", "joel", "chris"]

// Stocker d'une autre maniere

const autre = 'soft'
const e = 'bibo'
MonTab = [autre, e]

// Acceder a un element du tab
console.log(MonTab[0])

// Compter les elements du tab
const longueur_tab = MonTab.length

// Ajouter des elements avec des methodes
MonTab.push('ribo', 'code')
console.log(MonTab)

// Supprimer le dernier element du tableau
MonTab.pop()

// Acceder aux element du tableau multi dimensionnel
let tab_ = [
    ["nom",'post',"prenom"],
    ['can','son','bruit']
]

for(var i = 0; i< tab_.length ; i ++){
    console.log(tab_[i])
}


console.log(longueur_tab)
console.log(MonTab)

// Convertir un tab en chaine

let montab = ['coco','cacao', 'cafe']
const chaine_ =  montab.toString()
console.log(chaine_)

// Supprimer le premier element du tab
const valeur_sup = montab.shift()
console.log(montab)

// Ajouter le premier element du tab
const valeur_aj = montab.unshift("ajouter")
console.log(montab)

// Suprrimer l'element du milieu, ca veut dire en commencant par l'index 1
// je vais supprimer un element
montab.splice(1, 1)
console.log(montab)

// voir la longueur  de chaque mot du tablea

const lg = montab.map(large =>{
    return large.length
})



console.log(lg)

// Tableau et reference

const tab = [1,2,3,4,5]
const tab2 = tab

tab2[2] = "change"

// Ici nous voyons que quand nous changeons la valeur dans tab2
//  ca change aussi dans tab parceque on a seulemnt change 
// la reference
// Avec const on peut pas modifier la reference mais les proprietes
// Mais avec let on peut modifier les touts

console.log(tab2)
console.log(tab)

let tab3 = [2,2,1,3,4,9]
tab3 = [3,9,18]
console.log(tab3)

// Les tableaux sont des objets qui ont des cles comme nombre

// Copiez les element s d'un tableau

const nouveau_tab = [...tab3]
tab3[0] = 12
console.log(tab3)
console.log(nouveau_tab)

// Decoupez un tableau a plusieurs blocs

let tab_new = [1,28,9,3,2,5,0]
const [premier, deuxieme, troisieme, ...othersnumbres] = tab_new

console.log(premier,deuxieme,troisieme)

// et pour recuperer les nombres restants utilisons la copie
console.log(othersnumbres)

// Triage du plus petit au grand et l'inverse

let tri = tab_new.sort((a,b)  => a-b)
tri
// Inverse
tri = tab_new.sort((a,b) => b -a)
tri

// Remnversee les elemsts 

let newtab2 = [1.3,4,5,6,7]
newtab2.reverse()
newtab2

// REcuperer les elemts au milieu du tableau
const rec = newtab2.slice(1,4)
rec

// Parcourir un tab facilement, pour les tableaux c'est of
// Mais pour les objets c in

for(let item of newtab2){
    console.log(item)
}
