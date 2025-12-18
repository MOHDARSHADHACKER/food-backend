const { signupValidation, loginValidation } = require("../Middlewares/signupValidation ");
const { login , signup } = require('../controller/User.controller');

module.exports = app => {

    const user = require("../controller/User.controller")
    const router = require("express").Router();

    // Signup
    router.post("/signup", signupValidation, signup);
     

   
    // Login
    router.post("/login", loginValidation, login);

    // Get all users
    router.get("/user", user.findAll);

    app.use('/api/fooditems', router);
};