import { usersStorage } from "../storages/usersStorage.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 chars";
const emailErr = "Must be a valid email format";
const numberErr = "must be a number";
const ageErr = "Age must be between 18 and 100";
const bioErr = "Bio mus be a maximum of 200 characters";

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
  body("email").trim().isEmail().withMessage(emailErr),
  body("age")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage(`age ${numberErr}`)
    .isInt({ min: 18, max: 100 })
    .withMessage(ageErr),
  body("bio")
    .optional({ values: "falsy" })
    .isLength({ max: 200 })
    .withMessage(bioErr),
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
      const { firstName, lastName, email, age, bio } = req.body;
      console.log(req.body);
      usersStorage.addUser({ firstName, lastName, email, age, bio });
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
      const { firstName, lastName, email, age, bio } = req.body;
      usersStorage.updateUser(req.params.id, {
        firstName,
        lastName,
        email,
        age,
        bio,
      });
      res.redirect("/");
    },
  ],

  usersDeletePost: (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
  },
};

export { usersController };
