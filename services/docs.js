const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports = (id)=>{
    return new Promise((resolve, reject)=>{
        let url = `https://docs.google.com/document/d/e/${id}/pub`;
        request(url, (error, response, body)=>{
            if(error) return error;
            let dom = new JSDOM(response.body)
            resolve(`
                ${dom.window.document.querySelector('head style').outerHTML}
                <article>${
                    dom.window.document.querySelector('#contents').innerHTML
                }</article>
            `)
        })
    })
}