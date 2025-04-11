import { usersStorage } from "../storages/usersStorage.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 chars";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
];

const usersController = {
  usersListGet: (req, res) => {
    res.render("index", {
      title: "User list",
      users: usersStorage.getUsers(),
    });
  },
  usersCreateGet: (req, res) => {
    res.render("createUser", { title: "Create User" });
  },
  usersCreatePost: [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createUser", {
          title: "create user",
          errors: errors.array(),
        });
      }
      const { firstName, lastName } = req.body;
      usersStorage.addUser({ firstName, lastName });
      res.redirect("/");
    },
  ],

  usersUpdateGet: (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
      title: "Update user",
      user: user,
    });
  },
  usersUpdatePost: [
    validateUser,
    (req, res) => {
      const user = usersStorage.getUser(req.params.id);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("updateUser", {
          title: "Update user",
          user: user,
          errors: errors.array(),
        });
      }
      const { firstName, lastName } = req.body;
      usersStorage.updateUser(req.params.id, { firstName, lastName });
      res.redirect("/");
    },
  ],

  usersDeletePost: (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  },
};

export { usersController };
