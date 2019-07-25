function create(req, res){
    const db = req.app.get('db');
    const { userId, postId, comment } = req.body;

    db.comments
    .insert({
        userId,
        postId,
        comment
    })
    .then(comment => res.status(201).json(comment))
    .catch(err => {
        console.error(err);
    });

}

function updateComment(req, res) {
    const db = req.app.get('db');
    const { comment } = req.body;

    db.comments
    .update({id:req.params.id}, {comment: comment})
    .then(comments => res.status(200).json(comments))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}

module.exports = {
    create,
    updateComment,

}