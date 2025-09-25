function List_Plantes(){
    // const plantes = [
    //     'chou','courge', 'aubergine',
    //     'amarante', 'celeris'
    // ]
    // return(
    //     <div>
    //         {plantes.map((element, index_elemt) =>(
    //             <li key={`${element} - ${index_elemt}`}>{element}</li>
    //         ))}
    //     </div>
    // )

    const Shopping_list = [
        {
            nom : "choux",
            categorie : "classique",
            id : 1,
            IsCool : true
        },
        {
            nom : "choux_fleur",
            categorie : "extra",
            id : 2,
            IsCool : false
        },
        {
            nom : "courge",
            categorie : "complexe",
            id : 3,
            IsCool : false
        }
    ]

    return(
        <div>
        {Shopping_list.map((plant) =>(
            <li key={plant.id}>
                {plant.nom} : 
                {/* si par exemple on veut que les vrai soint a la plante qui est cool */}
                {/* {plant.IsCool ? <span> 👍</span> : <span> 👎</span>} */}

                {/* ou */}

                {/* {plant.IsCool && <span> 👍</span>} */}

                {/* si on veut que les plantes qui sont pas cool, on met rien
                    on peut seulement changer la 2em partie de la condition par null
                */}
                {plant.IsCool && plant.categorie === 'classique' && <span> 👍</span>}


            </li>
        ))}
        </div>
    )
}

export default List_Plantes