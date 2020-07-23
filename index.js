let files = {
    grupoestudiantil: {
        miembros: '1zHcxzKaOuvDb6UcumonlAnftDk8zstGN0X5nq3rtaxY'
    },
    eventos: {
        calendario: 'Y3RybGFsdHRlY0BnbWFpbC5jb20'
    },
    contenido: {
        posts: '1LvOiUOBqpv8YLyQmmsKb3d29_H0z3aXYSgZEnbbotx8'
    }
}

let express = require('express');
let https = require('https')
let sheets = require('./sheets');
const calendar = require('./calendar');
const docs = require('./docs');
let app = express();

app.get('/grupoestudiantil/miembrosybits/miembros', async (req, res)=>{
    let data = await sheets({id: files.grupoestudiantil.miembros})
    res.json(data.rows)
})
app.get('/grupoestudiantil/miembrosybits/bits', async (req, res)=>{
    let data = await sheets({id: files.grupoestudiantil.miembros, sheet: 2})
    res.json(data.rows)
})

app.get('/eventos/calendario', async (req, res)=>{
    let data = await calendar();
    res.json(data.VCALENDAR[0].VEVENT)
})

app.get('/contenido/posts', async (req, res)=>{
    let data = await sheets({id: files.contenido.posts});
    res.json(data.rows)
})

app.get('/contenido/posts/:post', async (req, res)=>{
    let data = await sheets({id: files.contenido.posts});
    let post = data.rows.find(l=>l.slug===req.params.post);
    if(post!=undefined){
        let file = await docs(post.id)
        res.set({ 'content-type': 'text/html; charset=utf-8' });
        res.end(file)
    } else {
        res.end("404. Not found")
    }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


