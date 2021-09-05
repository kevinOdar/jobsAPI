const express = require('express');

const router = express.Router();

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
