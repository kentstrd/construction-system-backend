// Create new project in your database and return its id
exports.post = function(project, res) {
  project.save().then(project => {
    res.status(201).json({
      message: 'Project added Succesfully',
      projectId: project._id
    });
  });
};

// Get projects
exports.get = function(projects, res) {
  projects.find().then(project => {
    res.status(200).json({ message: 'Succesfully Get', project: project });
  });
};

//Delete project
exports.delete = function(projects, projectId, res) {
  projects.deleteOne({ _id: projectId }).then(result => {
    res.status(200).json({ message: 'Post Deleted' });
  });
};
