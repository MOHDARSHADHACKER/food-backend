const {order, getMyOrders } = require('../controller/OrderData.controller');


module.exports = app => {
    console.log('here in orderRoute::::')
    const router = require("express").Router();


    router.post('/orderData', order);

    // Get user's order history
router.post("/myOrderData", getMyOrders);

    app.use('/api', router);
};
