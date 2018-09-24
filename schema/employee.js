const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  fullname: {
    firstName: String,
    lastName: String
  },
  gender: String,
  skill: String,
  addresses: [
    {
      homeaddress: String
    }
  ],
  contacts: [
    {
      homenumber: String
    }
  ]
});

module.exports = mongoose.model('Employee', employeeSchema);
