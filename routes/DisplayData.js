const {foodData} = require('../controller/DisplayData.controller');


module.exports = app => {

    const router = require("express").Router();


    router.post('/foodData', foodData);

    app.use('/api/fooditems', router);
};





