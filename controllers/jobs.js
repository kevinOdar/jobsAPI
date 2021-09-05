require('express-async-errors');
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');
const Job = require('../models/Job');
// const { BadRequestError } = require('../errors');

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const newJob = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(newJob);
};

const getJobs = async (req, res) => {
  const createdBy = req.user.userId;
  const jobs = await Job.find({ createdBy }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const job = await Job.findOne({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) throw new NotFoundError(`No job with the id ${req.params.id}`);
  res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: _id },
    user: { userId },
  } = req;
  if (!company || !position)
    throw new BadRequestError('Please, enter a company and a position');
  const job = await Job.findOneAndUpdate(
    {
      _id,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No job with the id ${req.params.id}`);
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  // const { id } = req.params;
  // const job = await Job.findByIdAndRemove(id);
  const {
    params: { id: _id },
    user: { userId },
  } = req;
  const job = await Job.findOneAndRemove({
    _id,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError(`No job with the id ${_id}`);
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
