import { AppError } from "../utilities/error/error";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate({
      ...req.body,
      ...req.query,
      ...req.params
    });

    if (error) {
      const { details } = error;
      const messages = details.map(i => i.message.replace(/["]/g, ''));  
      next(new AppError(messages.join(', '), 403, 'failed'));  
    } else {
      next();
    }
  };
};
