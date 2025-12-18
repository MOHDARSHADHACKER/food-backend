module.exports = app => {
    
   const FoodController = require("../controller/FoodItem.controller")
    const router = require("express").Router();

    router.get("/food", FoodController.findAll);

     app.use('/api/fooditems', router);
};