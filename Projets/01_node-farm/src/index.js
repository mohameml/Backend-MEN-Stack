const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// Global variables :
const PORT = 8000;
const IP_ADRESS = "127.0.0.1";

// DATA :
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Template HTML :
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

// Server :
const server = http.createServer((req, res) => {
    const { query, pathname: pathName } = url.parse(req.url, true);

    // Overview Page
    if (pathName === "/" || pathName === "/overview") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });

        const cards = dataObj
            .map((ele) => replaceTemplate(tempCard, ele))
            .join("");
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cards);
        res.end(output);

        // Product Page
    } else if (pathName === "/product") {
        const id = +query.id;
        const idMax = dataObj
            .map((ele) => ele.id)
            .reduce((max, curr) => Math.max(max, curr), -Infinity);

        if (id > idMax) {
            res.writeHead(404, {
                "Content-type": "text/html",
                "my-header": "my-value",
            });
            res.end("<h1>Page not found</h1>");
        } else {
            res.writeHead(200, {
                "Content-type": "text/html",
            });
            const dataId = dataObj.filter((ele) => ele.id === id);
            const finalTemp = replaceTemplate(tempProduct, dataId[0]);

            res.end(finalTemp);
        }
        // API
    } else if (pathName === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        res.end(data);

        // NOT FOUND
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
