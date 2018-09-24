module.exports = function(req, res, next) {
  if (req.project || req.employee) {
    next();
  } else {
    res.status(401).end();
  }
};
