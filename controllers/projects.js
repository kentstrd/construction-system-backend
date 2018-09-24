var express = require('express'),
  router = express.Router(),
  Project = require('../routes/project'),
  schema = require('../schema/project'),
  auth = require('../middlewares/auth');

router.post('/api/project', auth, function(req, res) {
  var project = new schema(req.body.project);
  Project.post(project, res);
});

router.get('/api/project', function(req, res) {
  Project.get(schema, res);
});

router.delete('/api/project/:id', function(req, res) {
  Project.delete(schema, req.params.id, res);
});

module.exports = router;

// const app = require('../database/index.js');
// const bodyParser = require('body-parser');

// // ROUTES TO USE PROJECT API TO ANGULAR

// app.route('/api/project/:id').get((req, res) => {
//   const requestedProjectId = req.params['name'];
//   res.send(requestedProjectId);
// });

// app.use(bodyParser.json());
// app.route('/api/project').post((req, res) => {
//   res.status(201).send(req.body);
// });

// app.route('/api/project/:id').put((req, res) => {
//   res.send(200, req.body);
// });

// app.route('/api/project/:id').delete((req, res) => {
//   res.sendStatus(204);
// });
