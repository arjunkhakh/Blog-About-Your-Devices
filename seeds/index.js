const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const seedUsers = require("./userData");
const seedPosts = require("./postData");
const seedComments = require("./commentData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await User.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(seedPosts, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(seedComments, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();