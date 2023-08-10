"use strict";
document.addEventListener("DOMContentLoaded", () => {

    const greenApi = {
        // Свойства
        idInstance: null,
        apiTokenInstance: null,
        messagePhoneNumber: null,
        message: null,
        imagePhoneNumber: null,
        urlImage: null,
        // Элементы страницы
        formIdAndToken: document.querySelector(".input-formIdAndToken"),
        formSendMessage: document.querySelector(".input-formSendMessage"),
        formSendImage: document.querySelector(".input-formSendImage"),
        btnGetSettings: document.querySelector(".btn-getSettings"),
        btnGetStateInstance: document.querySelector(".btn-getStateInstance"),
        btnSendMessage: document.querySelector(".btn-sendMessage"),
        btnSendFileByUrl: document.querySelector(".btn-sendFileByUrl"),
        dataOutput: document.querySelector(".data-output"),

        // Метод отправки сообщения
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
        // Метод отправки фотографии
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
        // Метод получения настроек
        async getSettings() {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/getSettings/${this.apiTokenInstance}`);
            let strJson = await response.json();
            return strJson;
        },
        // Метод получения StateInstance
        async getStateInstance() {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/getStateInstance/${this.apiTokenInstance}`);
            let strJson = await response.json();
            return strJson;
        },
        // Уставнока значений idInstance и apiTokenInstance
        setValuesIdAndApi() {
            const idInstance = document.getElementsByName("idInstance")[0].value;
            const apiTokenInstance = document.getElementsByName("apiTokenInstance")[0].value;
            this.idInstance = idInstance;
            this.apiTokenInstance = apiTokenInstance;
        },
        // Установка значений номера телефона и сообщения 
        setValuesMessagePhoneNumberAndMessage() {
            const messagePhoneNumber = document.getElementsByName("formSendMessage-phoneNumber")[0].value;
            const message = document.getElementsByName("message")[0].value;
            this.messagePhoneNumber = messagePhoneNumber;
            this.message = message;
        },
        // Установка значений номера телефона и ссылки фотографии
        setValuesImagePhoneNumberAndUrl() {
            const imagePhoneNumber = document.getElementsByName("formSendImage-phoneNumber")[0].value;
            const urlImage = document.getElementsByName("url-image")[0].value;
            this.imagePhoneNumber = imagePhoneNumber;
            this.urlImage = urlImage;
        },
        // Проверка значений idInstance и apiTokenInstance
        checkValuesIdAndApi() {
            if((this.idInstance != "" && this.apiTokenInstance != "") && (typeof this.idInstance == "string" && typeof this.apiTokenInstance == "string") && (this.idInstance != null && this.apiTokenInstance != null)) {
                return true;
            }
            return false;
        },
        // Проверка значений номера телефона и сообщения
        checkValuesMessagePhoneNumberAndMessage() {
            if((this.messagePhoneNumber != "" && this.message != "") && (typeof this.messagePhoneNumber == "string" && typeof this.message == "string") && (this.messagePhoneNumber != null && this.message != null)) {
                return true;
            }
            return false;
        },
        // Проверка номера телефона и ссылки фотографии
        checkValuesImagePhoneNumberAndUrlImage() {
            if((this.imagePhoneNumber != "" && this.urlImage != "") && (this.imagePhoneNumber != null && this.urlImage != null)) {
                return true;
            }
            return false;
        },
        // Оброботка данных настроек
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
        // Получение данных настроек
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
        // Оброботка данных StateInstance
        processingDataStateInstance() {
            document.querySelector(".data-output").innerHTML = "";

            if(this.checkValuesIdAndApi()) {
                this.getStateInstance().then(json => {
                    document.querySelector(".data-output").innerHTML = `<p class='data-item'>${JSON.stringify(json)}</p>`;
                });
            }
        },
        // Получение данных StateInstance
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
        // Оброботка отправки сообщения
        proccessingSendMessage() {
            this.setValuesMessagePhoneNumberAndMessage();
            if(this.checkValuesMessagePhoneNumberAndMessage()) {
                this.sendMessage(this.messagePhoneNumber, this.message);
                document.querySelector(".data-output").innerHTML = `<p class='data-success'>Сообщение отправлено</p>`;
            }
        },
        // Получение отправки сообщения
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
        // Оброботка отправки фотографии 
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
        // Получение отправки фотографии
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
        // Общий метод вызова
        getRender() {
            this.getDataStateInstance();
            this.getDataSettings();
            this.getSendMessage();
            this.getFileByUrl();
        }
        
    };
    greenApi.getRender();
});