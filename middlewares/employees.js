Employee = require('../controllers/employee');

module.exports = function(req, res, next) {
  if (req.session && req.session.employee) {
    Employee.get(req.session.employee, function(err, employee) {
      if (employee) {
        req.employee = employee;
      } else {
        delete req.employee;
        delete req.session.employee;
      }

      next();
    });
  } else {
    next();
  }
};
