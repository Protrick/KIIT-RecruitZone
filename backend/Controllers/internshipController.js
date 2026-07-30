const Internship = require('../models/Internship');

/**
 * @desc    Get all internships (students & admin) with filtering, search, sort, pagination
 * @route   GET /api/internships
 * @access  Public / Student
 * @query   status, branch, batchYear, category, mode, search, sort, page, limit
 */
exports.getAllInternships = async (req, res) => {
  try {
    const {
      status,
      branch,
      batchYear,
      category,
      mode,
      search,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (branch) filter['eligibility.branchesAllowed'] = branch;
    if (batchYear) filter['eligibility.batchYears'] = Number(batchYear);
    if (category) filter.category = category;
    if (mode) filter.mode = mode;

    if (search) {
      // uses the text index defined on the Internship model (company, role, category)
      filter.$text = { $search: search };
    }

    const sortOptions = {
      newest: { postedOn: -1 },
      deadline: { registrationDeadline: 1 },
      stipend: { stipendAmount: -1 },
    };
    const sortBy = sortOptions[sort] || sortOptions.newest;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [internships, total] = await Promise.all([
      Internship.find(filter).sort(sortBy).skip(skip).limit(limitNum),
      Internship.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: internships.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: internships,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internships',
      error: err.message,
    });
  }
};

/**
 * @desc    Get a single internship by ID
 * @route   GET /api/internships/:id
 * @access  Public / Student
 */
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    res.status(200).json({ success: true, data: internship });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid internship ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to fetch internship',
      error: err.message,
    });
  }
};

/**
 * @desc    Create a new internship drive
 * @route   POST /api/internships
 * @access  Admin
 */
exports.createInternship = async (req, res) => {
  try {
    const internship = await Internship.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: internship });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create internship',
      error: err.message,
    });
  }
};

/**
 * @desc    Update an existing internship drive
 * @route   PUT /api/internships/:id
 * @access  Admin
 */
exports.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    res.status(200).json({ success: true, data: internship });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid internship ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update internship',
      error: err.message,
    });
  }
};

/**
 * @desc    Delete an internship drive
 * @route   DELETE /api/internships/:id
 * @access  Admin
 */
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }

    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid internship ID' });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete internship',
      error: err.message,
    });
  }
};

/**
 * @desc    Get dashboard stats for admin (e.g. student interest per drive)
 * @route   GET /api/internships/stats/dashboard
 * @access  Admin
 */
exports.getInternshipStats = async (req, res) => {
  try {
    const totalInternships = await Internship.countDocuments();
    const byStatus = await Internship.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const byCategory = await Internship.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    const mostInterested = await Internship.find()
      .sort({ interestedCount: -1 })
      .limit(5)
      .select('company role interestedCount');

    res.status(200).json({
      success: true,
      data: { totalInternships, byStatus, byCategory, mostInterested },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats',
      error: err.message,
    });
  }
};