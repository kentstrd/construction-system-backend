import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { omitBy, isNil } from 'lodash';

import APIError from '../utils/APIError';

/**
 * employee Schema
 * @private
 */

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

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
employeeSchema.pre('save', async function save(next) {
  try {
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
employeeSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'fullname', 'gender', 'addresses', 'contacts'];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
employeeSchema.statics = {
  /**
   * Get employee
   *
   * @param {ObjectId} id - The objectId of employee.
   * @returns {Promise<Employee, APIError>}
   */
  async get(id) {
    try {
      let employee;

      if (mongoose.Types.ObjectId.isValid(id)) {
        employee = await this.findById(id).exec();
      }
      if (employee) {
        return employee;
      }

      throw new APIError({
        message: 'employee does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List of employees in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of employee to be skipped.
   * @param {number} limit - Limit number of employee to be returned.
   * @returns {Promise<Employee[]>}
   */
  list({ page = 1, perPage = 30, title }) {
    const options = omitBy({ title }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

/**
 * @typedef Employee
 */
export default mongoose.model('Employee', employeeSchema);
