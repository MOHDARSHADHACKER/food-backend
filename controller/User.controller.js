const db = require("../models/database");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
     console.log("REQ BODY ===>", req.body);
    try {
        const { name, email, location, password, date } = req.body;

        // ✅ password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            location,
            password: hashedPassword, // 👈 hashed password save होगा
            date
        });

        const savedUser = await user.save();

        res.status(201).send({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                location: savedUser.location,
                date: savedUser.date
                // password hidden
            }
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    }
};


exports.login = async (req, res) => {
    try {
        // console.log("JWT_SECRET:", process.env.JWT_SECRET); 
        const { email, password } = req.body;

        // 1. User check karo
        const user = await User.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(400).json({ message:errorMsg, success:false });
        }

        // 2. Password compare karo
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({ message:errorMsg, success:false });
        }

        // 3. JWT token generate karo (optional)
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,   // isko .env file me rakho
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email,
            name: user.name
           
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// get all users 
exports.findAll = async (req, res) => {
  try {
    // console.log('finding::::::');
    const data = await User.find({});
    // console.log('data:::::::', data);
    res.send(data);
  } catch (err) {
    console.log('error:::', err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tests."
    });
  }
};

