module.exports = mongoose => {
    const schema = new mongoose.Schema(
        {
            categoryName: String,
        
        },
        { timestamps: true }
    );

    // 👇 Ab Mongoose exact "test" collection use karega
    const CategoryData = mongoose.model("food_category", schema, "food_category");
    return CategoryData;
};