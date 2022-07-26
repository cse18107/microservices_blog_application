const express = require("express");
const { randomBytes } = require("crypto");
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

let commentsByPostId = {};

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId,content});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id
      }
    })

    res.status(201).send(comments);

});

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id]  || [] );
});

app.post('/events', (req,res) => {
  console.log('Received Event',req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
