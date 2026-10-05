export function validBody(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const error = JSON.parse(err.message)[0].message;
      error.statusCode = 400;
      throw err;
    }
  };
}
