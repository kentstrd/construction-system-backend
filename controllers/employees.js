var express = require('express'),
  router = express.Router(),
  Employee = require('../routes/employee'),
  schema = require('../schema/employee'),
  auth = require('../middlewares/auth');

router.post('/api/employee', auth, function(req, res) {
  const employee = new Employee({
    fullname: {
      firstName: req.body.fullname.firstName,
      lastName: req.body.fullname.lastName
    },
    gender: req.body.gender,
    skill: req.body.skill,
    addresses: req.body.addresses,
    contacts: req.body.contacts
  });
  Employee.post(employee, res);
});

router.get('/api/employee', function(req, res) {
  Employee.get(schema, res);
});

router.delete('/api/employee/:id', function(req, res) {
  Employee.delete(schema, req.params.id, res);
});

module.exports = router;
