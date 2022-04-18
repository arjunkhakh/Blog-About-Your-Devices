const { User } = require("../models");

const userData = [
  {
    username: "JillVal",
    password: "jillval",
    email: "jill@val.com"
  },
  {
    username: "LadyGags",
    password: "shallow",
    email: "shallow@gag.com"
  },
  {
    username: "JohnSmith",
    password: "smithyBoy",
    email: "john@smith.com"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;