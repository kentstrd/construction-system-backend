import httpStatus from 'http-status';
import { omit } from 'lodash';
import Project from '../models/project';

import { handler as errorHandler } from '../middlewares/error';
import { generateError } from '../utils/generateError';

/**
 * Load project and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const project = await Project.get(id);
    req.locals = { project };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get project
 * @public
 */
exports.get = (req, res) => {
  res.json(req.locals.project.transform());
};

/**
 * Create new project
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const project = new Project(req.body);
    const savedproject = await project.save();
    // console.log(savedproject.transform());
    res.status(httpStatus.CREATED);
    res.json({
      message: 'Project added Succesfully',
      projectId: savedproject._id || 'new'
    });
    // console.log(res.json(savedproject.transform()));
  } catch (error) {
    next(generateError(error));
  }
};

/**
 * Replace existing project
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { project } = req.locals;
    const newproject = new Project(req.body);
    const newprojectObject = omit(newproject.toObject(), ['_id']);
    await project.update(newprojectObject, { override: true, upsert: true });
    const savedproject = await Project.findById(project._id);
    res.json(savedproject.transform());
  } catch (error) {
    next(generateError(error));
  }
};

/**
 * Update existing project
 * @public
 */
exports.update = (req, res, next) => {
  const project = Object.assign(req.locals.project, req.body);
  project
    .save()
    .then(savedproject => res.json(savedproject.transform()))
    .catch(e => next(generateError(e)));
};

/**
 * Get project list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const projects = await Project.list(req.query);
    // const transformedprojects = projects.map(project => project.transform());
    res.status(200).json({ message: 'Succesfully Get', project: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete project
 * @public
 */
exports.remove = (req, res, next) => {
  const { project } = req.locals;

  project
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
