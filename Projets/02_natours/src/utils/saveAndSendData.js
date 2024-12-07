/**
 * fonction génerique qui sauvgarde le data dans le fichier est renvoie la réponse vers le client :
 *
 * @param {*} path : path to file
 * @param {*} data : data that will be save in file
 * @param {*} res : Response object
 * @param {*} code : status code in success
 * @param {*} resJSon : json to send in success case
 */
const fs = require('fs');

const saveAndSendData = (path, data, res, code, resJSon) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), (err) => {
        if (!err) {
            res.status(code).json(resJSon);
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'could not save the data in file',
            });
        }
    });
};

module.exports = saveAndSendData;
