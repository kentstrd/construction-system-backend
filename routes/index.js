var express = require('express'),
  router = express.Router();

router.use(require('./projects'));
router.use(require('./employees'));

module.exports = router;
