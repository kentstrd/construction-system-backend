import httpStatus from 'http-status';
import { omit } from 'lodash';
import Employee from '../models/employee';

import { handler as errorHandler } from '../middlewares/error';
import { generateError } from '../utils/generateError';

/**
 * Load employee and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const employee = await employee.get(id);
    req.locals = { employee };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get employee
 * @public
 */
exports.get = (req, res) => {
  res.json(req.locals.employee.transform());
};

/**
 * Create new employee
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const employee = new Employee(req.body);
    const savedemployee = await employee.save();
    console.log(savedemployee);
    res.status(httpStatus.CREATED);
    res.json({
      message: 'employee added Succesfully',
      employeeId: savedemployee._id
    });
  } catch (error) {
    next(generateError(error));
  }
};

/**
 * Replace existing employee
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { employee } = req.locals;
    const newemployee = new Employee(req.body);
    const newemployeeObject = omit(newemployee.toObject(), ['_id']);
    await employee.update(newemployeeObject, { override: true, upsert: true });
    const savedemployee = await employee.findById(employee._id);
    res.json(savedemployee.transform());
  } catch (error) {
    next(generateError(error));
  }
};

/**
 * Update existing employee
 * @public
 */
exports.update = (req, res, next) => {
  const employee = Object.assign(req.locals.employee, req.body);
  employee
    .save()
    .then(savedemployee => res.json(savedemployee.transform()))
    .catch(e => next(generateError(e)));
};

/**
 * Get employee list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const employees = await Employee.list(req.query);
    // const transformedemployees = employees.map(employee => employee.transform());
    res.status(200).json({ message: 'Succesfully Get', employee: employees });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete employee
 * @public
 */
exports.remove = (req, res, next) => {
  const { employee } = req.locals;

  employee
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
