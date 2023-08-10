"use strict";
document.addEventListener("DOMContentLoaded", () => {

    const greenApi = {
        idInstance: null,
        apiTokenInstance: null,
        messagePhoneNumber: null,
        message: null,
        imagePhoneNumber: null,
        urlImage: null,
        formIdAndToken: document.querySelector(".input-formIdAndToken"),
        formSendMessage: document.querySelector(".input-formSendMessage"),
        formSendImage: document.querySelector(".input-formSendImage"),
        btnGetSettings: document.querySelector(".btn-getSettings"),
        btnGetStateInstance: document.querySelector(".btn-getStateInstance"),
        btnSendMessage: document.querySelector(".btn-sendMessage"),
        btnSendFileByUrl: document.querySelector(".btn-sendFileByUrl"),
        dataOutput: document.querySelector(".data-output"),

        async sendMessage(chatId, message) {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`, 
            {
                method: "POST",
                body: `{\r\n\t\"chatId\": \"${chatId}@c.us\",\r\n\t\"message\": \"${message}\"\r\n}`,
                headers: {
                    'Content-type': 'application/json'
            }});
            return response;
        },
        async sendFileByUrl(chatId, urlFile, fileName) {
            let caption = "Изображение";
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendFileByUrl/${this.apiTokenInstance}`, 
            {
                method: "POST",
                body: `{\r\n   \t\"chatId\": \"${chatId}@c.us\",\r\n\t\"urlFile\": \"${urlFile}\",\r\n\t\"fileName\": \"${fileName}\",\r\n\t\"caption\": \"${caption}\"\r\n}`,
                headers: {
                    'Content-type': 'application/json'
            }});
            return response;
        },
        async getSettings() {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/getSettings/${this.apiTokenInstance}`);
            let strJson = await response.json();
            return strJson;
        },
        async getStateInstance() {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/getStateInstance/${this.apiTokenInstance}`);
            let strJson = await response.json();
            return strJson;
        },
        setValuesIdAndApi() {
            const idInstance = document.getElementsByName("idInstance")[0].value;
            const apiTokenInstance = document.getElementsByName("apiTokenInstance")[0].value;
            this.idInstance = idInstance;
            this.apiTokenInstance = apiTokenInstance;
        },
        setValuesMessagePhoneNumberAndMessage() {
            const messagePhoneNumber = document.getElementsByName("formSendMessage-phoneNumber")[0].value;
            const message = document.getElementsByName("message")[0].value;
            this.messagePhoneNumber = messagePhoneNumber;
            this.message = message;
        },
        setValuesImagePhoneNumberAndUrl() {
            const imagePhoneNumber = document.getElementsByName("formSendImage-phoneNumber")[0].value;
            const urlImage = document.getElementsByName("url-image")[0].value;
            this.imagePhoneNumber = imagePhoneNumber;
            this.urlImage = urlImage;
        },
        checkValuesIdAndApi() {
            if((this.idInstance != "" && this.apiTokenInstance != "") && (typeof this.idInstance == "string" && typeof this.apiTokenInstance == "string") && (this.idInstance != null && this.apiTokenInstance != null)) {
                return true;
            }
            return false;
        },
        checkValuesMessagePhoneNumberAndMessage() {
            if((this.messagePhoneNumber != "" && this.message != "") && (typeof this.messagePhoneNumber == "string" && typeof this.message == "string") && (this.messagePhoneNumber != null && this.message != null)) {
                return true;
            }
            return false;
        },
        checkValuesImagePhoneNumberAndUrlImage() {
            if((this.imagePhoneNumber != "" && this.urlImage != "") && (this.imagePhoneNumber != null && this.urlImage != null)) {
                return true;
            }
            return false;
        },
        proccessingDataSettings() {
            document.querySelector(".data-output").innerHTML = "";
            if(this.checkValuesIdAndApi()) {
                this.getSettings().then(json => {
                    for(let item in json) {
                        document.querySelector(".data-output").innerHTML += `<p class='data-item'>Свойство: ${item} => ' ${json[item]} '</p>`;
                    }
                });
            } else {
                document.querySelector(".data-output").innerHTML = "<p class='data-error'>Введите верные данные IdInstance и ApiTokenInstance</p>";
            }
        },
        getDataSettings() {
            this.formIdAndToken.addEventListener("submit", event => {
                event.preventDefault();

                this.setValuesIdAndApi();

                this.btnGetSettings.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.proccessingDataSettings();
                });

                this.btnGetSettings.removeEventListener("click", (event) => {
                    event.preventDefault();
                    this.proccessingDataSettings();
                });
            });
        }, 
        processingDataStateInstance() {
            document.querySelector(".data-output").innerHTML = "";

            if(this.checkValuesIdAndApi()) {
                this.getStateInstance().then(json => {
                    document.querySelector(".data-output").innerHTML = `<p class='data-item'>${JSON.stringify(json)}</p>`;
                });
            }
        },
        getDataStateInstance() {
            this.formIdAndToken.addEventListener("submit", event => {
                event.preventDefault();

                this.setValuesIdAndApi();

                if(this.checkValuesIdAndApi()) {
                    this.btnGetStateInstance.addEventListener("click", event => {
                        event.preventDefault();
                        this.processingDataStateInstance();
                    });

                    this.btnGetStateInstance.removeEventListener("click", event => {
                        event.preventDefault();
                        this.processingDataStateInstance();
                    });
                }
            });
        },
        proccessingSendMessage() {
            this.setValuesMessagePhoneNumberAndMessage();
            if(this.checkValuesMessagePhoneNumberAndMessage()) {
                this.sendMessage(this.messagePhoneNumber, this.message);
                document.querySelector(".data-output").innerHTML = `<p class='data-success'>Сообщение отправлено</p>`;
            }
        },
        getSendMessage() {
            this.formSendMessage.addEventListener("submit", event => {
                event.preventDefault();
                this.setValuesIdAndApi();
                if(this.checkValuesIdAndApi()) {
                    this.btnSendMessage.addEventListener("click", event => {
                        event.preventDefault();
                        this.proccessingSendMessage();
                    });

                    this.btnSendMessage.removeEventListener("click", event => {
                        event.preventDefault();
                        this.proccessingSendMessage();
                    });
                }
            });
        },
        proccessingSendFileByUrl() {
            this.setValuesImagePhoneNumberAndUrl();

            if(this.checkValuesImagePhoneNumberAndUrlImage()) {
                document.querySelector(".data-output").innerHTML = "";
                let divideUrlImage = this.urlImage.split("/");
                let indexImage = divideUrlImage[divideUrlImage.length - 1];
                this.sendFileByUrl(this.imagePhoneNumber, this.urlImage, indexImage);
                document.querySelector(".data-output").innerHTML += `<p class='data-success'>Изображение отправлено</p>`;
                document.querySelector(".data-output").innerHTML += `
                                                                    <p class='data-image-block'>
                                                                        <img src="${this.urlImage}" alt="Изображение" class='data-image'>
                                                                    </data>`;
            }
        },
        getFileByUrl() {
            this.formSendImage.addEventListener("submit", event => {
                event.preventDefault();
                this.setValuesIdAndApi();
                if(this.checkValuesIdAndApi()) {
                    this.btnSendFileByUrl.addEventListener("click", event => {
                        event.preventDefault();
                        this.proccessingSendFileByUrl();
                    });
                    this.btnSendFileByUrl.removeEventListener("click", event => {
                        event.preventDefault();
                        this.proccessingSendFileByUrl();
                    });
                }
            });
        },
        getRender() {
            this.getDataStateInstance();
            this.getDataSettings();
            this.getSendMessage();
            this.getFileByUrl();
        }
        
    };
    greenApi.getRender();
});