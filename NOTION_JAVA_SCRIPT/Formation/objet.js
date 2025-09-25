// Creer un objet en js

let Voiture = {
    nom: "Rav4",
    marque: "toyota",
    place: "2"
}
// Ajouter une valeur

Voiture.usine = "Japon"
Voiture.pdg = "soft"

// Acceder a une valeur de notre objet
const nom_voit = Voiture.nom
console.log(nom_voit)

const pdg_ = Voiture.pdg
console.log(pdg_)

// La longueur de l'objet

const long = Voiture.place
console.log(long)

// Les Objets

let Objet_ = {
    "key" : "value",
    "nom" : "noble",
    "age" : 12,
    "key_objets" : {
        "keys" : "values"
    },
    user : "10124",
    univ : "ucbc"
}

// Afficher tous les cles de l'objet et value

console.log(Object.keys(Objet_))
console.log(Object.values(Objet_))

// Recuperer un element de l'objet

console.log(Objet_.age)
console.log(Objet_['user'])

// Essayons la copie pour les objets

const {...copie_objet} = Objet_
// Alors la copie element par element

const {key,nom,age, ...other} = Objet_
key
nom
age
other

const recupered = Objet_
recupered.age = '23'
console.log(Objet_)

// Parcourir un objet facilemtn

let MyObj = {
    id : 1,
    nom : "noble",
    age : "25",
    Adresse : "UE"
}
for(let key in MyObj){
    // Pour les cles
    console.log(key)
    // Pour les valeurs
    console.log(MyObj[key])
}

for(const [key, value] of Object.entries(MyObj)){
    console.log(key, value)
}
for(let f of Object.values(MyObj)){
    console.table(f)
}