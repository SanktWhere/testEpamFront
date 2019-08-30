export class userModel {
    /*
        id - int
        name - str
        city - str
        materialStatus - str
        telephone - str
        email - str
        interest - str[]
        status - str
        friends - friendsId[]
    */
    constructor(id, name, city, materialStatus, telephone, email, interest, status, friends) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.materialStatus = materialStatus;
        this.telephone = telephone;
        this.email = email;
        this.interest = interest;
        this.status = status;
        this.friends = friends;
    }
}