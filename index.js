let files = {
    grupoestudiantil: {
        miembros: '1zHcxzKaOuvDb6UcumonlAnftDk8zstGN0X5nq3rtaxY'
    },
    eventos: {
        // calendario: 'Y3RybGFsdHRlY0BnbWFpbC5jb20',
        calendario: 'c_2uj0cckrh1eicbsbqkannojso4%40group.calendar.google.com'
    },
    contenido: {
        posts: '1LvOiUOBqpv8YLyQmmsKb3d29_H0z3aXYSgZEnbbotx8'
    },
    colab: {
        quanta: {
            blog: '1E6rBa4F5gRIvT3Bw6uAgNC7pJtVs9jX30MvymE1iJ-g'
        }
    }
}

let express = require('express');
let https = require('https')
let sheets = require('./sheets');
const calendar = require('./calendar');
const docs = require('./docs');
let app = express();

app.get('/', (req, res)=>{
    res.end(`
        <html>
            <body>
                <h1>CTRL ALT TEC API</h1>
                Más info en <a href="https://github.com/ctrl-alt-tec/API">https://github.com/ctrl-alt-tec/API</a>
            </body>
        </html>
    `)
})

app.get('/grupoestudiantil/miembrosybits/miembros', async (req, res)=>{
    let data = await sheets({id: files.grupoestudiantil.miembros})
    res.json(data.rows)
})
app.get('/grupoestudiantil/miembrosybits/bits', async (req, res)=>{
    let data = await sheets({id: files.grupoestudiantil.miembros, sheet: 2})
    res.json(data.rows)
})

app.get('/eventos/calendario', async (req, res)=>{
    let data = await calendar(files.eventos.calendario);
    res.json(data.VCALENDAR[0].VEVENT)
})

app.get('/contenido/posts', async (req, res)=>{
    let data = await sheets({id: files.contenido.posts});
    let posts = data.rows.map(post=>({
        ...post, 
        url: 'https://ctrl-alt-tec.herokuapp.com/contenido/posts/'+post.slug
    }));
    res.json(posts);
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


app.get('/colab/quanta/blog', async (req, res)=>{
    let data = await sheets({id: files.colab.quanta.blog});
    let posts = data.rows.map(post=>({
        ...post, 
        url: 'https://ctrl-alt-tec.herokuapp.com/colab/quanta/blog/'+post.slug
    }));
    res.json(posts);
})

app.get('/colab/quanta/blog/:post', async (req, res)=>{
    let data = await sheets({id: files.colab.quanta.blog});
    let post = data.rows.find(l=>l.slug===req.params.post);
    if(post!=undefined){
        let file = await docs(post.id)
        res.set({ 'content-type': 'text/html; charset=utf-8' });
        res.end(file)
    } else {
        res.end("4olk")
    }
})

app.listen((process.env.PORT || 3000), function () {
    console.log('Example app listening on port' + (process.env.PORT || 3000));
});


