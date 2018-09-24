Project = require('../routes/project');

module.exports = function(req, res, next) {
  if (req.session && req.session.project) {
    Project.get(req.session.project, function(err, project) {
      if (project) {
        req.project = project;
      } else {
        delete req.project;
        delete req.session.project;
      }

      next();
    });
  } else {
    next();
  }
};
