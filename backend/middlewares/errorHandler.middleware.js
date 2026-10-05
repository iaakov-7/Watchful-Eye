export function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.statusCode ? err.message : "תקלה פנימית בשרת",
    });
  }
}
