'use strict';

class UserInfo {
    constructor(name, job, initialInformation, userInfoJob, userInfoName, avatar) {
        this.name = name;
        this.job = job;
        this.initialInformation = initialInformation;
        this.userInfoJob = userInfoJob;
        this.userInfoName = userInfoName;
        this.avatar = avatar;
    }

    setUserInfo(newName, newJob) {
        this.name = newName;
        this.job = newJob;
    }

    updateUserInfo() {
        this.userInfoName.textContent = this.name;
        this.userInfoJob.textContent = this.job;
    }
    

    // Для получения информации о пользователе при загрузке используется переданный в качестве параметра классу UserInfo экземпляр метода класса api.
    getInitialInfo() {
        this.initialInformation()
        .then((data) => {
            this.userInfoName.textContent = data.name;
            this.userInfoJob.textContent = data.about;
            this.avatar.src = data.avatar;
            this.name = data.name;
            this.job = data.about;
        })
        .catch((err) => console.log(err));
    }
}
    