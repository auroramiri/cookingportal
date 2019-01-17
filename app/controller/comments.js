const db = require('../config/db.config.js')
Comments = db.comment;

exports.createComment = (req, res) =>{
    const body = req.body
    Comments.create(body)
    .then(comment =>{Comments.findOne({
            where:{id : comment.id}
        }).then(comment=>{
        res.send(comment)
    })
    })
    .catch(err => res.status(400).json({ err: `Failed`}))
}

exports.deleteComment = (req, res) => {
	const id = req.params.id;
	Comments.destroy({
	  where: { id: id }
	}).then(() => {
		res.status(200).send('Comment has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};