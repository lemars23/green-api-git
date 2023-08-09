"use strict";
document.addEventListener("DOMContentLoaded", () => {

    // const greenApi = {
        // idInstance: "7103845989",
        // apiTokenInstance: "6229f9d2d9df4c82aaafa42b2c3a4c7f59a0a0a318bf421086",
    //     getSettings() {
    //         fetch(`https://api.green-api.com/waInstance${this.idInstance}/getSettings/${this.apiTokenInstance}`).then(response => response.json()).then(json => console.log(json));
    //     },
    //     getStateInstance() {
    //         fetch(`https://api.green-api.com/waInstance${this.idInstance}/getStateInstance/${this.apiTokenInstance}`).then(response => response.json()).then(json => console.log(json));
    //     },
    //     sendMessage(chatId, message) {
    //         fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendMessage/${this.apiTokenInstance}`, 
    //         {
    //             method: "POST",
    //             body: `{\r\n\t\"chatId\": \"${chatId}@c.us\",\r\n\t\"message\": \"${message}\"\r\n}`,
    //             headers: {
    //                 'Content-type': 'application/json'
    //         }}).then(response => response.json()).then(json => console.log(json));
    //     },
    //     sendFileByUrl(chatId, urlFile, fileName, caption) {
    //         fetch(`https://api.green-api.com/waInstance${this.idInstance}/sendFileByUrl/${this.apiTokenInstance}`, 
    //         {
    //             method: "POST",
    //             body: `{\r\n   \t\"chatId\": \"${chatId}@c.us\",\r\n\t\"urlFile\": \"${urlFile}\",\r\n\t\"fileName\": \"${fileName}\",\r\n\t\"caption\": \"${caption}\"\r\n}`,
    //             headers: {
    //                 'Content-type': 'application/json'
    //         }}).then(response => response.json()).then(json => console.log(json));
    //     }
    // };

    const greenApi = {
        idInstance: null,
        apiTokenInstance: null,
        formIdAndToken: document.querySelector(".input-formIdAndToken"),
        formSendMessage: document.querySelector(".input-formSendMessage"),
        formSendImage: document.querySelector(".input-formSendImage"),
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
        getDataSettings() {
            this.formIdAndToken.addEventListener("submit", event => {
                event.preventDefault();
            });
        },
        setValuesIdAndApi() {
            const idInstance = document.getElementsByName("idInstance")[0].value;
            const apiTokenInstance = document.getElementsByName("apiTokenInstance")[0].value;
            greenApi.idInstance = idInstance;
            greenApi.apiTokenInstance = apiTokenInstance;
        }
    };

    // greenApi.sendFileByUrl(
    //     77054966857,
    //     "https://avatars.mds.yandex.net/get-pdb/477388/77f64197-87d2-42cf-9305-14f49c65f1da/s375",
    //     "horse.png",
    //     "лошадь"
    // );

    // greenApi.sendMessage("77054966857", "213");    

    

    const formIdAndToken = document.querySelector(".input-formIdAndToken"),
        formSendMessage = document.querySelector(".input-formSendMessage"),
        formSendImage = document.querySelector(".input-formSendImage");

    
    formIdAndToken.addEventListener("submit", event => {
        event.preventDefault();

        const idInstance = document.getElementsByName("idInstance")[0].value;
        const apiTokenInstance = document.getElementsByName("apiTokenInstance")[0].value;
        greenApi.idInstance = idInstance;
        greenApi.apiTokenInstance = apiTokenInstance;

        const btnGetSettings = document.querySelector(".btn-getSettings");
        const btnGetStateInstance = document.querySelector(".btn-getStateInstance");

        if((greenApi.idInstance != "" && greenApi.apiTokenInstance != "") && (typeof greenApi.idInstance == "string" && typeof greenApi.apiTokenInstance == "string") && (greenApi.idInstance != null && greenApi.apiTokenInstance != null)) {
            btnGetSettings.addEventListener("click", () => {
                greenApi.getSettings().then(json => {
                    for(let item in json) {
                        document.querySelector(".data-output").innerHTML += `<p class='data-item'>Свойство: ${item} => ' ${json[item]} '</p>`;
                    }
                    console.log(json);
                });
            });
        }
    });

    

    


    


});