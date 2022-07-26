const express = require('express');

const app = express();
const { randomBytes } = require('crypto');

app.use(express.json());

const posts = {};

app.get('/posts',(req,res) => {
    res.send(posts);
});

app.post('/posts', (req,res)=> {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,title
    };

    res.status(201).send(posts[id]);
});

app.listen(4000,()=>{
    console.log('Listening on 4000');
})
