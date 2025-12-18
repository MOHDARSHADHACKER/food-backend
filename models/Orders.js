

const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  order_data: [
    {
      items: [
        {
          name: String,
          qty: Number,
          size: String,
          price: Number
        }
      ],
      order_date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Order', OrderSchema);

