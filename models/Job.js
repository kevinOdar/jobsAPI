const { Schema, model, Types } = require('mongoose');

const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Please, provide a company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please, provide a job position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Please, provide an user'],
    },
  },
  { timestamps: true }
);

const JobModel = model('Job', JobSchema);

module.exports = JobModel;
