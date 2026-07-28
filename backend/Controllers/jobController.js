const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { status, branch, batchYear, search, sort, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (branch) filter['eligibility.branchesAllowed'] = branch;
    if (batchYear) filter['eligibility.batchYears'] = Number(batchYear);

    if (search) {
      // uses the text index defined on the Job model (company, role)
      filter.$text = { $search: search };
    }

    const sortOptions = {
      newest: { postedDate: -1 },
      deadline: { registrationDeadline: 1 },
      ctc: { ctcValue: -1 },
    };
    const sortBy = sortOptions[sort] || sortOptions.newest;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort(sortBy).skip(skip).limit(limitNum),
      Job.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: err.message });
  }
};

/**
 * @desc    Get a single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public / Student
 */
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to fetch job', error: err.message });
  }
};

/**
 * @desc    Create a new job drive
 * @route   POST /api/jobs
 * @access  Admin
 */
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Failed to create job', error: err.message });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to update job', error: err.message });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid job ID' });
    }
    res.status(500).json({ success: false, message: 'Failed to delete job', error: err.message });
  }
};


exports.getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const byStatus = await Job.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const mostInterested = await Job.find()
      .sort({ interestedCount: -1 })
      .limit(5)
      .select('company role interestedCount');

    res.status(200).json({
      success: true,
      data: { totalJobs, byStatus, mostInterested },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: err.message });
  }
};