"use strict";
document.addEventListener("DOMContentLoaded", () => {

    const greenApi = {
        idInstance: null,
        apiTokenInstance: null,
        formIdAndToken: document.querySelector(".input-formIdAndToken"),
        formSendMessage: document.querySelector(".input-formSendMessage"),
        formSendImage: document.querySelector(".input-formSendImage"),
        btnGetSettings: document.querySelector(".btn-getSettings"),
        btnGetStateInstance: document.querySelector(".btn-getStateInstance"),
        btnGetSettings: document.querySelector(".btn-getSettings"),
        btnGetStateInstance: document.querySelector(".btn-getStateInstance"),


        getStateInstance() {
            fetch(`https://api.green-api.com/waInstance${this.idInstance}/getStateInstance/${this.apiTokenInstance}`).then(response => response.json()).then(json => console.log(json));
        },
        sendMessage(chatId, message) {
            fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`, 
            {
                method: "POST",
                body: `{\r\n\t\"chatId\": \"${chatId}@c.us\",\r\n\t\"message\": \"${message}\"\r\n}`,
                headers: {
                    'Content-type': 'application/json'
            }}).then(response => response.json()).then(json => console.log(json));
        },
        sendFileByUrl(chatId, urlFile, fileName, caption) {
            fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendFileByUrl/${this.apiTokenInstance}`, 
            {
                method: "POST",
                body: `{\r\n   \t\"chatId\": \"${chatId}@c.us\",\r\n\t\"urlFile\": \"${urlFile}\",\r\n\t\"fileName\": \"${fileName}\",\r\n\t\"caption\": \"${caption}\"\r\n}`,
                headers: {
                    'Content-type': 'application/json'
            }}).then(response => response.json()).then(json => console.log(json));
        },
        async getSettings() {
            let response = await fetch(`https://api.green-api.com/waInstance${this.idInstance}/getSettings/${this.apiTokenInstance}`);
            let strJson = await response.json();
            return strJson;
        },
        setValuesIdAndApi() {
            const idInstance = document.getElementsByName("idInstance")[0].value;
            const apiTokenInstance = document.getElementsByName("apiTokenInstance")[0].value;
            greenApi.idInstance = idInstance;
            greenApi.apiTokenInstance = apiTokenInstance;
        },
        checkValuesIdAndApi() {
            if((greenApi.idInstance != "" && greenApi.apiTokenInstance != "") && (typeof greenApi.idInstance == "string" && typeof greenApi.apiTokenInstance == "string") && (greenApi.idInstance != null && greenApi.apiTokenInstance != null)) {
                return true;
            }
            return false;
        },
        getDataSettings() {
            this.formIdAndToken.addEventListener("submit", event => {
                event.preventDefault();

                this.setValuesIdAndApi();

                this.btnGetSettings.addEventListener("click", () => {
                    if(this.checkValuesIdAndApi()) {
                        greenApi.getSettings().then(json => {
                            for(let item in json) {
                                document.querySelector(".data-output").innerHTML += `<p class='data-item'>Свойство: ${item} => ' ${json[item]} '</p>`;
                            }
                            console.log(json);
                        });
                    } 
                }, {once: true});
            });
        }


        
    };

    greenApi.getDataSettings();

});