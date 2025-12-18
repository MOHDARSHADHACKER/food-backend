
const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            "string.base": "Name must be a text",
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters",
            "any.required": "Name is required"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required"
        }),
        password: Joi.string().min(4).max(100).required(),
        // location: Joi.string().min(4).max(100).required(),
        // date: Joi.date().required()

    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(err => err.message) // 👈 सिर्फ readable messages
        });
    }
    next();
};


// ✅ Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(err => err.message)
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};