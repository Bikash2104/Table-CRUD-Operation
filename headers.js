// headers.js
module.exports = (req, res, next) => {
  // 👇 Allow frontend to access X-Total-Count
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
};
