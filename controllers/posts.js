function create(req, res) {
    const db = req.app.get('db');
    const { userId, content } = req.body;

    db.posts
    .save({
        userId,
        content
    })
    .then(post => res.status(201).json(post))
    .catch(err => {
        console.error(err);
    });
}

function fetchPost(req, res) {
    const db = req.app.get('db');
    const posts = [];
    
    if(req.query.comments === "") {
        db.posts
        .findOne({id:req.params.id})
        .then(post => {
            const postId = post.id;
            posts.push(post)

            db.comments
            .find({postId: postId})
            .then(comments => {
                posts.push(comments)
                res.status(200).json(posts)
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).end()
        })
    }
    else{
        db.posts
        .findOne(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end()
        })
    } 
}

function fetchUserPost(req, res) {
    const db = req.app.get('db');

    db.posts
    .find({userId:req.params.id})
    .then(posts => res.status(200).json(posts))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}

function updatePost(req, res){
    const db = req.app.get('db');
    const { content } = req.body;

    db.posts
    .update({id:req.params.id}, {content: content})
    .then(posts => res.status(200).json(posts))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}




module.exports = {
    create,
    fetchPost,
    fetchUserPost,
    updatePost,
}