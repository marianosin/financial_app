
function cardConstructor(dashboard) {
    // CConecto con el contenedor 

    const cardContainer = document.querySelector('#menuCardContainer')
    // cardContainer.className = 'menuCardContainer'
    console.log(cardContainer)
    // Loop de elementos de users 
    dashboard.sections.map((section)=> {
        
        // Crea el anchor de cada tarjeta 
        const link = document.createElement('a')
        link.href = section.relPath
        
        // Crea un elemento para contonerlo, la tarjeta


        const card = document.createElement('div')
        card.classList = 'menuCard menuCard1' //Se le asignasu estilo
        
        // Creo el contenedor de texto 

        const cardContent = document.createElement('div')
        cardContent.className = 'cardContent'
        console.log(cardContainer)
        // Creo el h2 para que contenga el nombre de la tarjeta
        const cardContentTitle = document.createElement('h2')
        cardContentTitle.textContent = section.cardName
        

        // Se crea los elementos añadiendo al dom
        cardContainer.appendChild(card)
        card.appendChild(link)
        link.appendChild(cardContent)
        cardContent.appendChild(cardContentTitle)
    })
}


export {cardConstructor}