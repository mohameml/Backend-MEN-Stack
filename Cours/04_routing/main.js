/*
serveur for something 
*/

const http = require("http");
const path = require("path");

const PORT = 8000;
const IP_ADRESS = "127.0.0.1";

const serveur = http.createServer((req, res) => {
    const pathName = req.url;
    console.log(pathName);

    if (pathName === "/about") {
        res.end("Wolckom to About page \n");
    } else {
        res.end("Hello from the serveur \n");
    }
});

serveur.listen(PORT, IP_ADRESS, () => {
    console.log(`Listening in adress : ${IP_ADRESS}  at the port ${PORT}`);
});
