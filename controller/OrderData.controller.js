
const Order = require('../models/Orders');

// 👉 Place order
exports.order = async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    // ek order object jisme items + date ho
    let data = {
      items: order_data,
      order_date: order_date || Date.now()
    };

    // check karo email ke liye record already hai ya nahi
    let eId = await Order.findOne({ email });

    if (eId === null) {
      // agar pehli baar order kar raha hai
      await Order.create({
        email,
        order_data: [data]
      });
      return res.json({ success: true, message: "Order created" });
    } else {
      // agar pehle se order history hai
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: data } }
      );
      return res.json({ success: true, message: "Order updated" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// 👉 Get my orders
exports.getMyOrders = async (req, res) => {
  try {
    const { email } = req.body;   // ✅ destructure
    let eId = await Order.findOne({ email });

    if (!eId) {
      return res.json({ orderData: [] });
    }

    res.json({ orderData: eId.order_data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

