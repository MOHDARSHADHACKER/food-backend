module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema(
            {
                name: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                location: {
                    type: String,
                    required: false
                },
                password: {
                    type: String,
                    required: true,
                    minlength:[6]
                },
                date: {
                    type: Date,
                    default: Date.now
                },
            },
            { timestamps: true }
        )
    );
    return User;
};



