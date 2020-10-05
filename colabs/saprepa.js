var express = require('express');
var router = express.Router();
let sheets = require('../services/sheets');
const calendar = require('../services/calendar');
const docs = require('../services/docs');

const data = {
    anuario: '1mjU4FDnt37d07tbGj8qYCVRuufsNol-nILgWo9WO9nc'
}

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res)=>{
    res.end('Saprepa')
})

router.get('/anuario/ago2020', async (req, res)=>{
    let sheet = await sheets({id: data.anuario})
    let sheet_data = sheet.rows.map(l=>({
        ...l, 
        fotoURL: `https://drive.google.com/uc?export=view&id=${ l.foto.split('=')[1] }` || ""
    }))
    res.json(sheet.rows);
})

module.exports = router; 