// Les Types des donnees

/*
    1. chaine des caracteres : String
    2. Boolean : true and false -> 0 ou 1
    3. Number : 1,2,3,4,567,89000,1000000
    4. BigInt : 100000000000000000000000000
    5. Symbol = new Symbol('a')
    6. null = il n'y a rien
    7. undefined : pas definie
*/

// 1. String

const string1 = "chaine double quote";
const string2 = 'chaine single quote'
const string3 = `chaine back-tip`

console.log(
    string1,
    string2,
    string3
)

// Concatenation

const nouveau_mot = `Cette chaine ajoute ${string1}`
console.log(nouveau_mot)

const mot = `On vient d'ajouter `+ string3
console.log(mot)

// Premier caractere et longueur

const long = mot.length

const premier_car = mot[0]


console.log(
    long, 
    premier_car
)
console.log(mot.charAt(0))

// Caster les string en nombre
let number = "12", nombre2 = '13'
const cast1 = Number(number)
const cast2 =  Number(nombre2)

console.log(
    `La valeur du nombre 1 caste est ${number}`,
    `Le deuxieme nombre caste est ${nombre2}`,
    `Et leur addition donne : ${cast1 + cast2}`
)

// 2. Nombre 

let premier_nombre = 23
premier_nombre += 23
console.log("L'addiition : ",premier_nombre)
premier_nombre -= 12
console.log("La soustraction : ",premier_nombre)
premier_nombre /= 3
console.log("La division : ",premier_nombre)
premier_nombre *= 7
console.log("La multiplication : ",premier_nombre)


// 3. Booleeen

const isMajor = false
const age = 23

console.log(`${age} is for Major ${isMajor}`)



