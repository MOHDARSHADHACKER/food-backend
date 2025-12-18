
const db = require("../models/database");
const Test = db.test;
const FoodCategory = db.food_category;

exports.findAll = async (req, res) => {
  try {
    // console.log('finding::::::');
    const data = await Test.find({});
    global.food_items = data;     // yaha hai global 
    // console.log('data:::::::', data);
    // Categories
    const categoryData = await FoodCategory.find({});
    global.food_category = categoryData;

    // Dono ek sath response me bhejna
    res.json({
      foodItems: data,
      categories: categoryData
    });
  } catch (err) {
    console.log('error:::', err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tests."
    });
  }
};
