const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  console.log(req.session);

  // Post.findAll({
  //   attributes: ["id", "description", "title", "created_at"],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ["id", "comment", "post_id", "user_id", "created_at"],
  //       include: {
  //         model: User,
  //         attributes: ["username"],
  //       },
  //     },
  //     {
  //       model: User,
  //       attributes: ["username"],
  //     },
  //   ],
  // })
  //   .then((postData) => {
  //     console.log(postData[0]);
  //     const posts = postData.map((post) => post.get({ plain: true }));
  //     res.render('homepage', {
  //       posts,
  //       loggedIn: req.session.loggedIn,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });

    try {
      // Get all posts and JOIN with user data and comments
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "description", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = postData.get({ plain: true });
      res.render("singlepost", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;