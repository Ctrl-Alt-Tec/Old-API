var express = require('express');
var router = express.Router();
let sheets = require('../services/sheets');

const data = {
    src: '1rsaRNWjFm3HpVGarjGmfc0lBFBgY4r8o9r3EMpUlAFo'
}

const msg = `
    <h1>Ctrl Alt Tec URL Shortenner</h1>
    Herramienta para facilitar la comunicacion e intercambio de enlaces.
    <br />
    La direccion proporcionada no es valida.
    <br />
`

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res)=>{
    res.end(msg)
})

router.get('/:u', async (req, res)=>{
    let sheet = await sheets({id: data.src});
    sheet.rows.filter(l=>!l.url.includes('/'));
    let redirect = sheet.rows.find(l=>l.redirect===req.params.u)
    // console.log(req.params.u)
    if(redirect != undefined){
        res.redirect(redirect.url);
        return;
    } else {
        res.end(msg);
    }

})

module.exports = router;