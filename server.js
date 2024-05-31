const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Middleware for logging
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

// Middleware for authorization
const authorize = (req, res, next) => {
    const apiKey = req.query.apiKey;
    if (apiKey && apiKey === '12345') {
        next();
    } else {
        const err = new Error('Forbidden');
        err.status = 403;
        next(err);
    }
};

// Middleware for handling JSON bodies
app.use(express.json());

// Apply the logger middleware to all routes
app.use(logger);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Dummy data
let data = {
    users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ],
    posts: [
        { id: 1, title: 'First Post', content: 'This is the first post.' },
        { id: 2, title: 'Second Post', content: 'This is the second post.' }
    ],
    comments: [
        { id: 1, postId: 1, content: 'Great post!' },
        { id: 2, postId: 2, content: 'Very informative.' }
    ]
};

// Define routes for users
app.get('/api/users', authorize, (req, res) => {
    res.json(data.users);
});

app.post('/api/users', authorize, (req, res) => {
    const newUser = {
        id: data.users.length + 1,
        name: req.body.name
    };
    data.users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', authorize, (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = data.users.find(user => user.id === userId);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/api/users/:id', authorize, (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = data.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        data.users.splice(userIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Define routes for posts
app.get('/api/posts', authorize, (req, res) => {
    const { title } = req.query;
    let posts = data.posts;
    if (title) {
        posts = posts.filter(post => post.title.includes(title));
    }
    res.json(posts);
});

app.post('/api/posts', authorize, (req, res) => {
    const newPost = {
        id: data.posts.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    data.posts.push(newPost);
    res.status(201).json(newPost);
});

app.put('/api/posts/:id', authorize, (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = data.posts.find(post => post.id === postId);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.delete('/api/posts/:id', authorize, (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postIndex = data.posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        data.posts.splice(postIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Define routes for comments
app.get('/api/comments', authorize, (req, res) => {
    const { content } = req.query;
    let comments = data.comments;
    if (content) {
        comments = comments.filter(comment => comment.content.includes(content));
    }
    res.json(comments);
});

app.post('/api/comments', authorize, (req, res) => {
    const newComment = {
        id: data.comments.length + 1,
        postId: req.body.postId,
        content: req.body.content
    };
    data.comments.push(newComment);
    res.status(201).json(newComment);
});

app.put('/api/comments/:id', authorize, (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = data.comments.find(comment => comment.id === commentId);
    if (comment) {
        comment.content = req.body.content;
        res.json(comment);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

app.delete('/api/comments/:id', authorize, (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const commentIndex = data.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        data.comments.splice(commentIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

app.get('/api/posts/:id/comments', authorize, (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postComments = data.comments.filter(comment => comment.postId === postId);
    res.json(postComments);
});

// Render a view using EJS
app.get('/', (req, res) => {
    res.render('index', { users: data.users, posts: data.posts, comments: data.comments });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});