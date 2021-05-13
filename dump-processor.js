const quest = require('querystring');
const crypto = require('crypto');
const fs = require("fs");

/**
 * 
 * @param {Request} request 
 * @param {Response} response 
 * @returns 
 */
module.exports = (request, response) => {
    let chunks = [];
    request.setEncoding('utf8');

    request.on('data', (chunk) => {
        chunks.push(chunk);
        // fs.appendFile("data.text", chunk, () => { });
    });

    request.on('end', () => {
        const dat = chunks.join("---");
        const unescapedDrat = quest.unescape(dat);
        //replace input name and html escaping space with + sign
        const replaced = unescapedDrat.replace("pastedata=","").replace(/\+/gi," ");

        const rand = crypto.randomInt(0, 262144);

        const filename = `${Date.now()}_${rand}`;
        const dir = "texts/";
        const fullname = `${dir}${filename}.text`;
        fs.writeFile(fullname, replaced, (err) => {
            if(err) throw err;
            const url = `/get/${filename}/`
            response.writeHead(302, {
                'Location': url
            });
            response.end();
        });
        // response.write(`<h1>Magic</h1>`);
        // response.end();
    });

    return;
}