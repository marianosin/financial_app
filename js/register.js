// Variables de sistema
import { DASHBOARD_USERS } from "./components/variables.js";
let dashboard = JSON.parse(localStorage.getItem(DASHBOARD_USERS))
let listOfUsernames = []
//Importa clase
import {User} from './components/User.js'
import { saveLS } from "./components/saveLS.js";

const registerBtn = document.querySelector('#registerBtn')
const validationMessage = document.querySelector('#validationMessage')
//Genera las variables necesarias
const username = document.querySelector('#registeredUsername')
const password = document.querySelector('#registeredPassword')
const names = document.querySelector('#registeredName')
const lastname = document.querySelector('#registeredLastname')
const age = document.querySelector('#registeredbirthday') //Cómo añado una excepción para que si no es un int vuelva a pedirlo?
const loginLink = document.querySelector('#loginLink')

// Variables de situación
let inUse = listOfUsernames.includes(username.value)
let validPaswword = false

// Compruebo que el usuario no esté en uso

for (let index = 0; index < dashboard.users.length; index++) {
    listOfUsernames.push(dashboard.users[index].username)
}





        
        


username.addEventListener('keyup', ()=>{

    inUse = listOfUsernames.includes(username.value)
    console.log(inUse)
    if(!inUse){
        username.className = 'form-control greenBackgroundInput'
        console.log('Este usename está disponible')
        
        
        


        
    } 
    if (inUse) {
        username.className = 'form-control redBackgroundInput'
        console.log('Este usename no está disponible')
    }
})



password.addEventListener('keyup',()=>{

    if (password.value.length<4) {
        password.className = 'form-control redBackgroundInput'
    }
    if (password.value.length>=4) {
        password.className = 'form-control greenBackgroundInput'
        validPaswword = true
    }
})


registerBtn.addEventListener('click', ()=>{
    

    if (names.value != null && lastname.value != null && username.value != null && inUse === false && validPaswword === true) {
        const regiterNewUser = new User(`${names.value} ${lastname.value}`,username.value,password.value, age.value)
        dashboard.users.push(regiterNewUser)

        saveLS(DASHBOARD_USERS,dashboard)
        console.log(dashboard.users)
        // dashboard.addUser(regiterNewUser)
        validationMessage.className = 'notHiddenForm greenBackgroundInput validationMessage'
        validationMessage.innerHTML = 'Usuario registrado correctamente. Para continuar, de click <a href="./" > aquí</a>'
    } else {
        validationMessage.className = 'notHiddenForm redBackgroundInput validationMessage'
        validationMessage.innerHTML = 'Ocurrió un error. Verifique los datos incorporados en el formulario.'
    
    }


    
})

//Cambios de formularios
loginLink.addEventListener('click', ()=>{
    console.log('dio click a cambio de formulario')
    if (loginForm.className === 'container hiddenForm') {
        loginForm.className = 'container notHiddenForm';
        registerForm.className = 'container hiddenForm';
        validationMessage.className = 'hiddenForm '

    } else {
        validationMessage.className = 'hiddenForm'
        loginForm.className = 'container hiddenForm';
        registerForm.className = 'container notHiddenForm';
    }


})

// console.log(user1)
// let correctRegistration = true
// for (let key in user1) {
//     console.log(key, user1[key]);
//     if ((user1[key]===null) || (user1[key]==='')) {
//         correctRegistration = false
//     }
// }
// // Mensaje de advertencia 
// if (correctRegistration === true){
//     alert("Su usuario fue creado correctamente.")
// } else {
//     alert("Debe completar todos los campos correctamente. Recuerde introducir números en su edad.")
// }