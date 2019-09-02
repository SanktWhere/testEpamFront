import {userModel} from './userModel.js';
import {renderUser} from './renderUser.js';

export class userRepository {
    constructor() {
        this.storage = [];
        this.options = 'results=20&nat=us,fr&inc=name,picture,location,email,phone';
        let that = this;
        this.getData('https://randomuser.me/api/?', this.options).then(function (result) {
            that.fillStore(JSON.parse(result.responseText).results);
            for (const key in that.storage) {
                renderUser.render(that.storage[key], 'content-main');
            }
            
        });
    }

    fillStore(data) {
        let userMod = {};
        for (const key in data) {
            userMod = new userModel(key, data[key].name.title, data[key].name.first, data[key].name.last,
                                        data[key].location.city, data[key].phone, data[key].email, data[key].location.street, 
                                        data[key].location.state, data[key].picture.medium, data[key].picture.large);
            this.storage.push(userMod);
        }
    }

    getData(url, options) {
        let xhr = new XMLHttpRequest();
        return new Promise(function(resolve, reject) {
            xhr.onload = () => resolve(xhr);
            xhr.onerror = () => reject(new Error(`Loading error`));
            xhr.open('GET', url + options, true);
            xhr.send();
        });
    }

    getUserById(id) {
        if(this.isUserIdExist(id)) {
            return this.storage[id];
        }
    }

    isUserIdExist(id) {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].id == id) {
                return true;
            }
        }
    }
}