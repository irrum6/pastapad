const fs = require("fs");
const te = require("./tengine");

module.exports = (request, response) => {
    const filename = request.url.replace("/get/", "").replace("/", "");
    const dir = "texts/";
    const fullname = `${dir}${filename}.text`;

    fs.readFile(fullname, 'utf8', (err, fd) => {
        if (err) {
            // silent fail and continue
            console.log(err);
            return;
        }       

        te.render(request,response,"pasted",{"--template1--":fd});
    });
};