const express = require('express')
require("dotenv").config();
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 8080;


let corsOptions = {
   origin : 'http://localhost:3000'
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// console.log("JWT_SECRET:", process.env.JWT_SECRET);



const db = require("./models/database");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to the database");
    })
    .catch(err => {
        console.log(" Cannot connect to database", err);
        process.exit();
    });


app.get('/', (req, res) => {
    res.send('Hello World')
})
require("./routes/DisplayData")(app);
// app.use('/api', require("./routes/Orderdata"));
require("./routes/Orderdata")(app);

require("./routes/FoodItem.routes")(app);
require("./routes/User.route")(app);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});