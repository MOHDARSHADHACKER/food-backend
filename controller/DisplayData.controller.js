exports.foodData =  (req, res) => {
   try {
    console.log(global.food_items)
    res.send([global.food_items])
   } catch (error) {
      res.status(500).send({
            message: err.message || "Some error occurred"
        });
   }
    };