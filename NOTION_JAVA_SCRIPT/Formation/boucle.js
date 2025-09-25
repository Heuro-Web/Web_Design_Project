let nombre = [1,2,3,4,5,6]
for(let i = 0; i < nombre.length; i ++){
    console.log(nombre[i])
}

let j = 0
while (j < nombre.length){
    console.log(`Le nombre a l'indice ${j} est: `,nombre[j])
    j ++
}

// Tableau d'objets

let Arr = [{
    age : 12,
    AgeName : "pubert",
    id : 4
},

{
    id : 0,
    base_data : "mysqli"
}]

// Boucle do while

let k = 0
do{
    Arr[k].id += 1
    k ++
}
while(k < Arr.length)
Arr