/*
serveur for something 
*/

const http = require("http");
const path = require("path");

const PORT = 8000;
const IP_ADRESS = "127.0.0.1";

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the OVERVIEW \n");
    } else if (pathName === "/product") {
        res.end("This is the PRODUCT \n");
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-header": "my-value",
        });
        res.end("<h1>Page not found</h1>");
    }
});

server.listen(PORT, IP_ADRESS, () => {
    console.log(`Listening in adress : ${IP_ADRESS}  at the port ${PORT}`);
});
