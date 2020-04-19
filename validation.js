//Validation
const Joi = require('@hapi/joi')  //npm install it first Linda 

//Register validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        lastname: Joi.string()
            .min(3).
            required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    //Validate entry before we make a User 
    return schema.validate(data)
}

//Register validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    //Validate entry before we make a User 
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;