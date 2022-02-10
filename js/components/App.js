
class App {
    constructor(activeSession){
        this.users = []
        this.sections = []
        this.activeSession = activeSession
        this.activeUser = ''
        this.activeUserPosition = 0 //En caso de que no lo encuentre al usuario tomara el usuario test
    }
    
    addUser(user) {
        this.users.push(user)
    }
    addSection(section){
        this.sections.push(section)
    }
}

export {App}