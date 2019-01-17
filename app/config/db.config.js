const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// RecipeTag will be our way of tracking relationship between Recipe and Tag models
// each Recipe can have multiple tags and each Tag can have multiple Recipes
const RecipeTag = sequelize.define('Recipe_tag', {})

db.tag = require('../model/tag.model.js')(sequelize, Sequelize)
db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.role = require('../model/role.model.js')(sequelize, Sequelize);
db.recipe = require('../model/recipe.model.js')(sequelize, Sequelize);
db.comment = require('../model/comment.model.js')(sequelize, Sequelize);
 
db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.recipe.belongsToMany(db.tag, { through: RecipeTag, unique: false })
db.tag.belongsToMany(db.recipe, { through: RecipeTag, unique: false })

db.user.hasMany(db.recipe, {onDelete: 'cascade', hooks: true})
db.recipe.belongsTo(db.user);
db.user.hasMany(db.comment, {onDelete: 'cascade', hooks: true})
db.comment.belongsTo(db.user)
db.recipe.hasMany(db.comment, {onDelete: 'cascade', hooks: true})
db.comment.belongsTo(db.recipe)

module.exports = db;