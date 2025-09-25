// Les composants fonction

function MyComponent(){
    const mon_titre = "Application Jungle"
    return(
        <div>
            <h1>{mon_titre.toUpperCase()}</h1>
        </div>
    )
}

function MainComponent(){
    const panier = 'Panier'
    const prix_fleur = 3
    const choux = 5
    const courge = 10
    return(
        <div>
            <h2>{panier}</h2>
            <ul>
                <li>Le prix du choux fleur {prix_fleur} $</li>
                <li>Le prix du choux {choux} $</li>
                <li>Le prix de la courge {courge} $</li>
            </ul>
            <p>Le total est {prix_fleur + choux + courge} $</p>
        </div>
        
    )
}

// Attachez react avec Html

ReactDOM.render(<div><MyComponent /><MainComponent/></div>, document.getElementById('react'))
// ReactDOM.render(<MainComponent />, document.querySelector('#main'))