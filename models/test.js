module.exports = mongoose => {
    const schema = new mongoose.Schema(
        {
            categoryName: String,
            name: String,
            img: String,
            description: String,
            
        },
        { timestamps: true }
    );

    // 👇 Ab Mongoose exact "test" collection use karega
    const Test = mongoose.model("test", schema, "test");
    return Test;
};
