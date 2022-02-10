
class User {
    constructor(fullName, username, password, birthday){
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.birthday = birthday;
        this.opHistory = []
    }
}

export {User}