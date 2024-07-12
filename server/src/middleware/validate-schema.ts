export const validateJoiSchema = (schema, source = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map((detail) => detail.message).join(", ");
      console.error("Joi Validation Error:", errorDetails);

      return res.status(400).json({
        message: "The provided data structure (schema) is incorrect",
        details: errorDetails,
      });
    }

    next();
  };
};
