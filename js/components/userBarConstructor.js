import { OpHistory } from "./opHistory.js"
import { saveLS } from "./saveLS.js";

function userBarConstructor(dashboard) {
    
    // Conecto con la barra para rellenarla de info
    const userBar = document.querySelector('#userBar')

    //conecto con el body
    let bodyEdited = document.getElementById('editableElement')

    //Obtengo los datos del usuario
    let activeUserJSON = ''

    dashboard.users.map((element)=>{
        let testUser = element.username
        if (testUser === dashboard.activeUser){
            activeUserJSON = element
        }
    })

    userBar.innerHTML = `Bienvenido <span class="userNameBar">${activeUserJSON.fullName}!</span>` 
    
    //Creo un elemento y lo añado a la barra

    let simulateOpBtn = document.createElement('input')
    simulateOpBtn.type = 'button'
    simulateOpBtn.className = 'simulateOpBtn'
    simulateOpBtn.value = 'Simular operación'

    //Elemento para cargar operaciones a la tabla de historial
    let loadOpBtn = document.createElement('input')
    loadOpBtn.type = 'button'
    loadOpBtn.className = 'loadOpBtn'
    loadOpBtn.value = 'Cargar operación'

    //Los incorporo a la barra.
    userBar.appendChild(simulateOpBtn)
    userBar.appendChild(loadOpBtn)

    //Les doy la funcionalidad
    //Simulador de op
    
    simulateOpBtn.addEventListener('click', ()=>{
        console.log('Dio click, va a cargar una op')

        //creo el elemento contenedor del formulario y que sraá el fondo
        if (bodyEdited.className != 'simulateOpBtn__dargBG') {
            bodyEdited.className = 'simulateOpBtn__dargBG'
        
            //Creo un botón con la función de cerrar el emergente
            let closeBtn = document.createElement('input')
            closeBtn.className = 'btn float-right simulateOpBtn__closeSimulationBtn'
            closeBtn.value = 'Cancelar simulación'

            //Creo todos los elementos del simulador
            let simulatorContainer = document.createElement('div')
            simulatorContainer.className = 'container'
            let simulatorBox = document.createElement('div')
            simulatorBox.className = 'd-flex justify-content-center h-100'
            let simulatorCard = document.createElement('div')
            simulatorCard.className = 'card'
            let simulatorHeader = document.createElement('div')
            simulatorHeader.className = 'card-header loginCardHeaderStyle'
            simulatorHeader.innerHTML = '<h1>Simular una compra estándar</h1>'
            let simulatorBody = document.createElement('div')
            simulatorBody.className = 'card-body'
            let simulatorForm = document.createElement('form')
            simulatorForm.onsubmit="return false"
            let simulatorInputGroup = document.createElement('div')
            simulatorInputGroup.className = 'input-group form-group'
            let simulatorPrepend = document.createElement('div')
            simulatorPrepend.className = 'input-group-prepend'
            simulatorPrepend.innerHTML = '<span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>'
            let simulatorInputText = document.createElement('input')
            simulatorInputText.type = 'number'
            simulatorInputText.className = 'form-control'
            simulatorInputText.id = 'simulatorAmmount'
            simulatorInputText.placeholder = 'Monto a simular'
            let simulatorButtonGroup = document.createElement('div')
            simulatorButtonGroup.className = 'input-group form-group'
            let simulateBtn =document.createElement('input')
            simulateBtn.className = 'btn float-right'
            simulateBtn.type = 'button'
            simulateBtn.value = 'Simular'
            simulateBtn.id = 'simulateCommissionsBtn'
            simulateBtn.prev
            let simulatorResults = document.createElement('div')


            //lo añado al contenedor
            bodyEdited.appendChild(simulatorContainer)
            simulatorContainer.appendChild(simulatorBox)
            simulatorBox.appendChild(simulatorCard)
            simulatorCard.appendChild(simulatorHeader)
            simulatorCard.appendChild(simulatorBody)
            simulatorBody.appendChild(simulatorForm)
            simulatorForm.appendChild(simulatorInputGroup)
            simulatorInputGroup.appendChild(simulatorPrepend)
            simulatorInputGroup.appendChild(simulatorInputText)
            simulatorForm.appendChild(simulatorButtonGroup)
            simulatorButtonGroup.appendChild(simulateBtn)
            simulatorButtonGroup.appendChild(closeBtn)

            //Obtengo elemento boton simular para añadir accion

            simulateBtn.addEventListener('click', ()=>{
                simulatorInputText.value

                if (simulatorInputText.value > 0) {
                    let ammount = simulatorInputText.value
                    simulatorResults.textContent = `Si usted invierte $ ${ammount} pesos. Sus comisiones serán de $ ${ammount*0.0075} (0.75%), lo que significa que usted se gastará $ ${ammount*1.0075}.`
                    simulatorBody.appendChild(simulatorResults)
                } else {
                    simulatorResults.textContent = `Debe introducir un valor mayor a cero`
                    simulatorBody.appendChild(simulatorResults)
                }

                })




            //Elimino las cosas
            closeBtn.addEventListener('click',()=>{
                bodyEdited.className = ''
                bodyEdited.removeChild(simulatorContainer)
                simulatorContainer.removeChild(simulatorBox)
                simulatorBox.removeChild(simulatorCard)
                simulatorCard.removeChild(simulatorHeader)
                simulatorCard.removeChild(simulatorBody)
                simulatorBody.removeChild(simulatorForm)
                simulatorForm.removeChild(simulatorInputGroup)
                simulatorInputGroup.removeChild(simulatorPrepend)
                simulatorInputGroup.removeChild(simulatorInputText)
                simulatorForm.removeChild(simulatorButtonGroup)
                simulatorButtonGroup.removeChild(simulateBtn)
                simulatorButtonGroup.removeChild(closeBtn)
            })
            
        }
        
        
        
    })

    //Elemento para cargar op
    loadOpBtn.addEventListener('click', ()=>{
        console.log('Dio click, va a cargar una op')

        //creo el elemento contenedor del formulario y que sraá el fondo
        if (bodyEdited.className != 'loadOpBtn__dargBG') {
            bodyEdited.className = 'loadOpBtn__dargBG'
        
            //Creo un botón con la función de cerrar el emergente
            let closeBtn = document.createElement('input')
            closeBtn.className = 'btn float-right simulateOpBtn__closeSimulationBtn'
            closeBtn.value = 'Cancelar carga'

            //Creo todos los elementos del simulador
            let loadOpContainer = document.createElement('div')
            loadOpContainer.className = 'container'
            let loadOpBox = document.createElement('div')
            loadOpBox.className = 'd-flex justify-content-center h-100'
            let loadOpCard = document.createElement('div')
            loadOpCard.className = 'card'
            let loadOpHeader = document.createElement('div')
            loadOpHeader.className = 'card-header loginCardHeaderStyle'
            loadOpHeader.innerHTML = '<h1>Cargar operación</h1>'
            let loadOpBody = document.createElement('div')
            loadOpBody.className = 'card-body'
            let loadOpForm = document.createElement('form')
            loadOpForm.onsubmit="return true"
            //Elementos del formulario
            //Ticker
            let loadOpInputGroupTicker = document.createElement('div')
            loadOpInputGroupTicker.className = 'input-group form-group'
            let loadOpPrependTicker = document.createElement('div')
            loadOpPrependTicker.className = 'input-group-prepend'
            loadOpPrependTicker.innerHTML = '<span class="input-group-text"><i class="fas fa-signature"></i></span>'
            let loadOpInputTextTicker = document.createElement('input')
            loadOpInputTextTicker.type = 'text'
            loadOpInputTextTicker.className = 'form-control'
            loadOpInputTextTicker.id = 'loadOpTicker'
            loadOpInputTextTicker.placeholder = 'Ticker'
            //Precio
            let loadOpInputGroupPrice = document.createElement('div')
            loadOpInputGroupPrice.className = 'input-group form-group'
            let loadOpPrependPrice = document.createElement('div')
            loadOpPrependPrice.className = 'input-group-prepend'
            loadOpPrependPrice.innerHTML = '<span class="input-group-text"><i class="fas fa-dollar-sign"></i></span>'
            let loadOpInputTextPrice = document.createElement('input')
            loadOpInputTextPrice.type = 'number'
            loadOpInputTextPrice.className = 'form-control'
            loadOpInputTextPrice.id = 'loadOpPrice'
            loadOpInputTextPrice.placeholder = 'Price'
            //Date
            let loadOpInputGroupDate = document.createElement('div')
            loadOpInputGroupDate.className = 'input-group form-group'
            let loadOpPrependDate = document.createElement('div')
            loadOpPrependDate.className = 'input-group-prepend'
            loadOpPrependDate.innerHTML = '<span class="input-group-text"><i class="fas fa-calendar-plus"></i></span>'
            let loadOpInputTextDate = document.createElement('input')
            loadOpInputTextDate.type = 'date'
            loadOpInputTextDate.className = 'form-control'
            loadOpInputTextDate.id = 'loadOpDate'
            loadOpInputTextDate.placeholder = 'Date'
            //Quantity
            let loadOpInputGroupQuantity = document.createElement('div')
            loadOpInputGroupQuantity.className = 'input-group form-group'
            let loadOpPrependQuantity = document.createElement('div')
            loadOpPrependQuantity.className = 'input-group-prepend'
            loadOpPrependQuantity.innerHTML = '<span class="input-group-text"><i class="fas fa-business-time"></i></span>'
            let loadOpInputTextQuantity = document.createElement('input')
            loadOpInputTextQuantity.type = 'number'
            loadOpInputTextQuantity.className = 'form-control'
            loadOpInputTextQuantity.id = 'loadOpQuantity'
            loadOpInputTextQuantity.placeholder = 'Quantity'
            //Exchange
            let loadOpInputGroupExchange = document.createElement('div')
            loadOpInputGroupExchange.className = 'input-group form-group'
            let loadOpPrependExchange = document.createElement('div')
            loadOpPrependExchange.className = 'input-group-prepend'
            loadOpPrependExchange.innerHTML = '<span class="input-group-text"><i class="fas fa-exchange-alt"></i></span>'
            let loadOpInputTextExchange = document.createElement('input')
            loadOpInputTextExchange.type = 'text'
            loadOpInputTextExchange.className = 'form-control'
            loadOpInputTextExchange.id = 'loadOpExchange'
            loadOpInputTextExchange.placeholder = 'Exchange'
            //EqType
            let loadOpInputGroupEqType = document.createElement('div')
            loadOpInputGroupEqType.className = 'input-group form-group'
            let loadOpPrependEqType = document.createElement('div')
            loadOpPrependEqType.className = 'input-group-prepend'
            loadOpPrependEqType.innerHTML = '<span class="input-group-text"><i class="fas fa-tag"></i></span>'
            let loadOpInputTextEqType = document.createElement('input')
            loadOpInputTextEqType.type = 'text'
            loadOpInputTextEqType.className = 'form-control'
            loadOpInputTextEqType.id = 'loadOpEqType'
            loadOpInputTextEqType.placeholder = 'Tipo de activo'

            //Botones
            let loadOpButtonGroup = document.createElement('div')
            loadOpButtonGroup.className = 'input-group form-group'
            let loadOpBtn =document.createElement('input')
            loadOpBtn.className = 'btn float-right'
            loadOpBtn.type = 'button'
            loadOpBtn.value = 'Cargar operación'
            loadOpBtn.id = 'loadOpBtn'
            loadOpBtn.prev
            let loadOpResults = document.createElement('div')


            //lo añado al contenedor
            bodyEdited.appendChild(loadOpContainer)
            loadOpContainer.appendChild(loadOpBox)
            loadOpBox.appendChild(loadOpCard)
            loadOpCard.appendChild(loadOpHeader)
            loadOpCard.appendChild(loadOpBody)
            loadOpBody.appendChild(loadOpForm)
            //Ticker
            loadOpForm.appendChild(loadOpInputGroupTicker)
            loadOpInputGroupTicker.appendChild(loadOpPrependTicker)
            loadOpInputGroupTicker.appendChild(loadOpInputTextTicker)
            //Precio
            loadOpForm.appendChild(loadOpInputGroupPrice)
            loadOpInputGroupPrice.appendChild(loadOpPrependPrice)
            loadOpInputGroupPrice.appendChild(loadOpInputTextPrice)
            //Quantity
            loadOpForm.appendChild(loadOpInputGroupQuantity)
            loadOpInputGroupQuantity.appendChild(loadOpPrependQuantity)
            loadOpInputGroupQuantity.appendChild(loadOpInputTextQuantity)
            //Quantity
            loadOpForm.appendChild(loadOpInputGroupDate)
            loadOpInputGroupDate.appendChild(loadOpPrependDate)
            loadOpInputGroupDate.appendChild(loadOpInputTextDate)
            //Exchange
            loadOpForm.appendChild(loadOpInputGroupExchange)
            loadOpInputGroupExchange.appendChild(loadOpPrependExchange)
            loadOpInputGroupExchange.appendChild(loadOpInputTextExchange)
            //EqType
            loadOpForm.appendChild(loadOpInputGroupEqType)
            loadOpInputGroupEqType.appendChild(loadOpPrependEqType)
            loadOpInputGroupEqType.appendChild(loadOpInputTextEqType)
            
            
            //Botones
            loadOpForm.appendChild(loadOpButtonGroup)
            loadOpButtonGroup.appendChild(loadOpBtn)
            loadOpButtonGroup.appendChild(closeBtn)

            //Obtengo datos del formulario para cargarlos en la tabla

            loadOpBtn.addEventListener('click', ()=>{
                let listOfValues = [loadOpInputTextTicker,
                    loadOpInputTextPrice,
                    loadOpInputTextDate,
                loadOpInputTextQuantity,
                loadOpInputTextEqType,
                loadOpInputTextExchange]
                let readyValues = []
                console.log(readyValues)
                listOfValues.map(function(element){
                    if (element.value === null || element.value === undefined || element.value === ''){
                        console.log(element.value)
                        element.className = 'form-control redBackgroundInput'
                    } else {
                        element.className = 'form-control'
                        readyValues.push(element.value)
                        
                        
                    }
                if (readyValues){
                    console.log(readyValues)
                    console.log('Deberia imprimir la lista de valores')
                }
                })
                // Añado un regustro al usuario
                let appUserHistory = JSON.parse(localStorage.getItem('DASHBOARD_USERS'))
                // aqui debo seleccionar el usuario que se activó

                console.log(activeUserJSON.opHistory.lenght)
                //elementos
                let id = activeUserJSON.opHistory.length
                let ticker = readyValues[0]
                let price = parseFloat(readyValues[1])
                let date = readyValues[2]
                let quantity = parseInt(readyValues[3])
                let ammount = price*quantity
                let totalAmmount = ammount*1.0075
                let commission = ammount*0.0075
                let exchange = readyValues[4]
                let tag = readyValues[5]

                //Solo en caso de tener todos los valores
                if (readyValues.length==6) {
                    alert('Se cargó correctamente.')
                    let newRegitration = new OpHistory(id,ticker,price, date, ammount, commission, totalAmmount, quantity, tag, 'NaN', exchange)

                    activeUserJSON.opHistory.push(newRegitration)


                    //Ahora debo sustituir el json que contiene al usuario

                    appUserHistory.users.map((element,index)=>{
                        let userMapped = element.username 
                        if (userMapped === dashboard.activeUser) {
                            appUserHistory.users[index] = activeUserJSON
                        }
                    })
    
                    saveLS('DASHBOARD_USERS', appUserHistory)
                    console.log(appUserHistory)
                }

                

                //Compruebo la carga, después estaria bien que swe abra otro dialogo antes de confirmar
                let tempTest = JSON.parse(localStorage.getItem('DASHBOARD_USERS'))
                console.log(tempTest.users[0].opHistory)
                })




            //Elimino las cosas
            closeBtn.addEventListener('click',()=>{
                bodyEdited.className = ''
                bodyEdited.removeChild(loadOpContainer)
                loadOpContainer.removeChild(loadOpBox)
                loadOpBox.removeChild(loadOpCard)
                loadOpCard.removeChild(loadOpHeader)
                loadOpCard.removeChild(loadOpBody)
                loadOpBody.removeChild(loadOpForm)
                loadOpForm.removeChild(loadOpInputGroup)
                loadOpInputGroup.removeChild(loadOpPrepend)
                loadOpInputGroup.removeChild(loadOpInputText)
                loadOpForm.removeChild(loadOpButtonGroup)
                loadOpButtonGroup.removeChild(loadOpBtn)
                loadOpButtonGroup.removeChild(closeBtn)
            })
            
        }
    })


}

export {userBarConstructor}