// Creer un programme de reservation de place

let OB = [{
    id : 1,
    nom : "noble",
    age : 44,
    argent : 200
},
{
    id : 2,
    nom : "soft",
    age : 42,
    argent : 3300
}]
try {
    function ReservedId(id_){
    let jeton = OB.find((id_voulu) => id_voulu.id === id_)
    if(!jeton){
        console.log('Votre demande n existe pas')
    }
    if(jeton){
        console.log("Votre place existe")
            if(jeton.age > 50){
                console.log("Vous etes age , votre place n'existe pas ici");   
            }
            console.log("Vous etes eligible")
    }

}
ReservedId(2)
} catch (error) {
    console.table("Y a une erreur : ", error.message)
}