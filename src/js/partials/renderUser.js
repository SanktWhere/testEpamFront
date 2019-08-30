export class renderUser {
    static render(data, placeClass) {
        console.log(this);
        let div = document.createElement('div');
        div.classList.add('user');

        function getContentForRender(userModel) {
            return `
                <div class="user__image"><img src="${userModel.avatarMedium}" alt="user" /></div>
                <div class="user__info">
                    <span class="user__title">${userModel.nameTitle}.</span>
                    <span class="user__firs-name">${userModel.firstName}</span>
                    <span class="user__last-name">${userModel.lastName}</span>
                </div>
                <div class="user__modal">
                    <div class="user__modal-content">
                        <span class="close">&times;</span>
                        <div class="user__info">
                            <span>${userModel.nameTitle}.</span>
                            <span>${userModel.firstName}</span>
                            <span>${userModel.lastName}</span>
                        </div>
                        <div><span class="user__text text_bold">City:</span>${userModel.city}</div>
                        <div><span class="user__text text_bold">State:</span>${userModel.state}</div>
                        <div><span class="user__text text_bold">Street:</span>${userModel.street}</div>
                        <div><span class="user__text text_bold">Telephone:</span>${userModel.telephone}</div>
                        <div><span class="user__text text_bold">Email:</span>${userModel.email}</div>
                        <div class="user__modal-image"><img src=${userModel.avatarLarge} alt='avatar'></div>
                    </div>
                </div>
            `;
        }

        div.innerHTML = getContentForRender(data);
        let elem = document.getElementsByClassName(placeClass)[0];
        elem.append(div);
    }

    static clearRenderContent(placeClass) {
        let elem = document.getElementsByClassName(placeClass)[0];
        elem.innerHTML = '';
    }


}
