const express = require('express');
const massive = require('massive');
const users = require('../controllers/users');
const posts = require('../controllers/posts');
const comments = require('../controllers/comments');
const hash = require('../controllers/hash');

massive({
    host: 'localhost',
    port: 5432,
    database: 'node3',
    user: 'postgres',
    password: 'node3db',
})
.then(db => {
    const PORT = 3000;
    const app = express();

    app.set('db', db);
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })

    app.post('/api/users', users.create)
    app.get('/api/fetchUsers', users.fetchUsers)
    app.get('/api/users/:id', users.fetchId)
    app.get('/api/users/:id/profile', users.fetchProfile)

    app.post('/api/posts', posts.create)
    app.get('/api/posts/:id', posts.fetchPost)
    app.get('/api/posts/user/:id', posts.fetchUserPost)
    app.patch('/api/updatePosts/:id', posts.updatePost)

    app.post('/api/comments', comments.create)
    app.patch('/api/updateComments/:id', comments.updateComment)

    app.post('/api/register', hash.register)
    app.post('/api/login', hash.login)

})

