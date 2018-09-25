import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { omitBy, isNil } from 'lodash';

import APIError from '../utils/APIError';

/**
 * project Schema
 * @private
 */

const projectSchema = mongoose.Schema({
  projectName: String,
  description: String,
  dateStarted: String,
  dateEnded: String,
  projectType: String,
  address: {
    province: String,
    municipality: String,
    barangay: String
  },
  costDetails: {
    totalCost: String,
    disbursement: [
      {
        cost: String,
        date: String
      }
    ]
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
projectSchema.pre('save', async function save(next) {
  try {
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
projectSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'projectName',
      'description',
      'dateStarted',
      'dateEnded',
      'projectType',
      'address',
      'costDetails'
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
projectSchema.statics = {
  /**
   * Get project
   *
   * @param {ObjectId} id - The objectId of project.
   * @returns {Promise<Project, APIError>}
   */
  async get(id) {
    try {
      let project;

      if (mongoose.Types.ObjectId.isValid(id)) {
        project = await this.findById(id).exec();
      }
      if (project) {
        return project;
      }

      throw new APIError({
        message: 'project does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List of projects in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of project to be skipped.
   * @param {number} limit - Limit number of project to be returned.
   * @returns {Promise<Project[]>}
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
 * @typedef Project
 */
export default mongoose.model('Project', projectSchema);
