const { User } = require("../models");

const userData = [
  {
    user_name: "JillVal",
    password: "jillval",
  },
  {
    user_name: "LadyGags",
    password: "shallow",
  },
  {
    user_name: "JohnSmith",
    password: "smithyBoy",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;