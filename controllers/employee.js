// Create new empolyee in your database and return its id
exports.post = function(empolyee, res) {
  empolyee.save().then(empolyee => {
    res.status(201).json({
      message: 'Empolyee added Succesfully',
      empolyeeId: empolyee._id
    });
  });
};

// Get employees
exports.get = function(employees, res) {
  employees.find().then(employee => {
    res.status(200).json({ message: 'Succesfully Get', employee: employee });
  });
};

//Delete employee
exports.delete = function(employees, employeeId, res) {
  employees.deleteOne({ _id: employeeId }).then(result => {
    res.status(200).json({ message: 'Post Deleted' });
  });
};
