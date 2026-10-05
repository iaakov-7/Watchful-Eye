export function validBody(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const errorMsg = JSON.parse(err.message)[0].message;
      const error = new Error(errorMsg);
      error.statusCode = 400;
      throw error;
    }
  };
}
