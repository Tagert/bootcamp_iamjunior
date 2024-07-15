import type { RequestHandler } from "express";
import type { Schema } from "joi";

type SourceType = "body" | "query" | "params";

export const validateJoiSchema = (schema: Schema, source: SourceType = "body"): RequestHandler => {
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
