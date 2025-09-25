let tab_name = ["Soft","cool"]
let index_mot = 0
let index_caract_mot = 0
let boucle = false
function Est() {
    const mot_act = tab_name[index_mot]
    const ecritoire =  document.querySelector('.ecriture')
    if(!boucle){
        ecritoire.textContent = mot_act.slice(0, index_caract_mot + 1)
        index_caract_mot ++
        if(index_caract_mot === mot_act.length){
            boucle = true
            setTimeout(Est, 300)
            return
        }
    }
    else{
        ecritoire.textContent = mot_act.slice(0, index_caract_mot - 1)
        index_caract_mot --
        if(index_caract_mot === 0){
            boucle = false
            index_mot = (index_mot + 1) % tab_name.length
        }
    }
    setTimeout(Est, 200)
}
Est()
