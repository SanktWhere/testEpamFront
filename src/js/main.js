import { userRepository } from './partials/userRepository.js';
import { renderUser } from './partials/renderUser.js';



document.addEventListener('DOMContentLoaded', function() { 
    let userRepo = new userRepository();

    function sortUsers(data, option = 'inc') {
        data.sort(function(a, b) {
            let nameA = a.firstName.toLowerCase(); 
            let nameB = b.firstName.toLowerCase();
            if (option === 'inc') {
                if (nameA < nameB) 
                return -1;
                if (nameA > nameB)  
                    return 1;
                return 0;
            }
            else {
                if (nameA > nameB) 
                return -1;
                if (nameA < nameB)  
                    return 1;
                return 0;
            }
        });
    }

    let select = document.getElementsByTagName('select')[0];
    select.addEventListener('change', function(e) {
        if (e.target.value === 'ABC') {
            sortUsers(userRepo.storage);
            renderUser.clearRenderContent('content-main');
            for (const key in userRepo.storage) {
                renderUser.render(userRepo.storage[key], 'content-main');
            }
        }
        else if (e.target.value === 'CBA') {
            sortUsers(userRepo.storage, 'dec');
            renderUser.clearRenderContent('content-main');
            for (const key in userRepo.storage) {
                renderUser.render(userRepo.storage[key], 'content-main');
            }
        }
    });


    document.addEventListener('click', function(e) {
        let user = e.target.closest('.user');

        if (user) {
            user.getElementsByClassName('user__modal')[0].style.display = 'flex';
        }

        if (e.target.classList.contains('user__modal')) {
            user.getElementsByClassName('user__modal')[0].style.display = 'none';
        }

        if (e.target.classList.contains('close')) {
            user.getElementsByClassName('user__modal')[0].style.display = 'none';
        }
    });
});