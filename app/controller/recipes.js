const db = require('../config/db.config.js')
const User = db.user;
const Recipe = db.recipe;
const Tag = db.tag

exports.CreateRecipe = (req,res)=>{
    const body = req.body
    const tags = body.tags.map(tag => Tag.findOrCreate({ where: { name: tag.name }, defaults: { name: tag.name }})
                                         .spread((tag, created) => tag))
    User.findById(body.userId)
        .then(() => Recipe.create(body))
        .then(recipe => Promise.all(tags).then(storedTags => recipe.addTags(storedTags)).then(() => recipe))
        .then(recipe => Recipe.findOne({ where: {id: recipe.id}, include: [Tag]}))
        .then(recipeWithAssociations => res.json(recipeWithAssociations))
        .catch(err => res.status(400).json({ err: `User with id = [${body.userId}] doesn\'t exist.`}))
}

exports.FindAllRecepies =  (req, res) => {
    console.log(req.params.tag)
    Recipe.findAll({
        include: [
            { model: Tag, where: { name: req.params.tag } }
        ],
        attributes: ['title', 'text', 'picture']
    })
    .then(recipe => res.json(recipe))
}

exports.deleteRecipe = (req, res) => {
	const id = req.params.id;
	Recipe.destroy({
	  where: { id: id }
	}).then(()=>{
		Comments.destroy({
			where: { recipeId: id }
			})
		}).then(() => {
		res.status(200).send('Recipe has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};