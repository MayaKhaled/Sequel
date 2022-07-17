const router = require("express").Router();
const auth = require("../middleware/authentication");
const userValidation = require("../middleware/userValidation");
const userController = require("../controllers/userController");

router
  .route("/signup")
  .post(userValidation.validateSignup, userController.signup);

router
  .route("/signin")
  .post(userValidation.validateSignin, userController.signin);

router
  .route("/addMovie")
  .post(
    auth.validateUser,
    userValidation.validateAddMovie,
    userController.addMovie
  );

router
  .route("/removeMovie")
  .post(
    auth.validateUser,
    userValidation.validateRemoveMovie,
    userController.removeMovie
  );

router.route("/getList").get(auth.validateUser, userController.getList);

module.exports = router;
