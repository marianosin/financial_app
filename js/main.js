


// Este scrip crea la aplicación inicial. 
// Se crean las secciones necesarias para el funcionamiento del aplicativo
import { DASHBOARD_USERS } from "./components/variables.js";
import {App} from './components/App.js'
import { User } from "./components/User.js";
import { Sections} from './components/Sections.js';

//Defino la variable dashboard para ser contenedora de la app
let dashboard = ''


// Obtengo el dato del localStorage
let tempList = JSON.parse(localStorage.getItem(DASHBOARD_USERS))
console.log(tempList)

if (tempList == null || tempList == undefined){
    // Inicializo la app en caso de que no exista

    dashboard = new App(false)

    // Creo un usuario modelo 
    const user1 = new User('Mariano Radusky','mradusky', 'Radusky', '1993-07-19')

    let stocks = new Sections('Mercado de acciones', 'Acciones', './#')
    let crypto = new Sections('Mercado de crypto', 'Cryptos', './#')
    let history = new Sections('Historial de operaciones', 'Historial', '../history/')
    dashboard.addSection(stocks)
    dashboard.addSection(crypto)
    dashboard.addSection(history)
    dashboard.addUser(user1)

    console.log('No existía info y fue creada')

    localStorage.setItem(DASHBOARD_USERS,JSON.stringify(dashboard));
    console.log(dashboard)

}else{
    console.log('Existe info y ya fue tomada.')
    dashboard = tempList
}



export {dashboard} // Exporto el dashboard para que pueda ser utilizado por el resto de
//Scripts