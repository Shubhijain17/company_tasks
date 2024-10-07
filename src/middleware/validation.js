import Joi from "joi";

const registerUserSchema = Joi.object({
    fullName: Joi.string().min(3).required().messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 3 characters long'
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email address'
    }),
    username: Joi.string().alphanum().min(3).required().messages({
      'string.empty': 'Username is required',
      'string.alphanum': 'Username must only contain letters and numbers',
      'string.min': 'Username must be at least 3 characters long'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    }),
  });

  const validateSchema = (req, res, next) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      console.log(error);
      // 400 status code clearly communicates to the client that their request was incorrect.
      return res.status(400).send(error.details);
    } else {
      next();
    }
  };
  
export default validateSchema;