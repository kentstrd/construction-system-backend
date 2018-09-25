import { Router } from 'express';

import projectRoute from './project';
import employeeRoute from './employee';

const router = Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/project', projectRoute);
router.use('/employee', employeeRoute);

module.exports = router;
