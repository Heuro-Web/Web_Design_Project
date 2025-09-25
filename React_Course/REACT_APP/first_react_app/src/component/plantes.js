function Plantes_card(){
    const prix_chou = 20
    const prix_chou_fleur = 10
    const courge = 30
    const title_card = 'Mes elements'
    return(
        <div className="plantes">
            <h3>{title_card.toUpperCase()}</h3>
            <ul>
                <li>Prix du choux : {prix_chou}</li>
                <li>Prix du choux fleur : {prix_chou_fleur}</li>
                <li>Prix courge : {courge}</li>
            </ul>
            <h3>Total : {prix_chou + prix_chou_fleur + courge} $</h3>
        </div>
    )
}

export default Plantes_card