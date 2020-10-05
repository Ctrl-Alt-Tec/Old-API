var express = require('express');
var router = express.Router();
let sheets = require('../services/sheets');
const calendar = require('../services/calendar');
const docs = require('../services/docs');

const data = {
    blog: '1E6rBa4F5gRIvT3Bw6uAgNC7pJtVs9jX30MvymE1iJ-g'
}

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res)=>{
    res.end('Quanta')
})

router.get('/blog', async (req, res)=>{
    let sheet = await sheets({id: data.blog});
    let posts = await sheet.rows.map(post=>({
        ...post, 
        url: `${req.hostname}${req.baseUrl}${req.path}/${post.slug}`
    }))
    res.json(posts);
})

router.get('/blog/:post', async (req, res)=>{
    let sheet = await sheets({id: data.blog});
    let post = sheet.rows.find(l=>l.slug===req.params.post);
    if(post==undefined){
        res.end("404. Couldn't find file.")
        return;
    }
    let file = await docs(post.id);
    res.set({ 'content-type': 'text/html; charset=utf-8' });
    res.end(file)
})

module.exports = router; 