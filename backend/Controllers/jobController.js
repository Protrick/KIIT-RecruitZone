const Job = require("../models/Job");
const Internship = require("../models/Internship");



const getJobs = async (req, res) => {
  try {
    const { search, location, minSalary } = req.query;
    let query = {};

    if (search && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skillsRequired: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    if (minSalary) {
      const salaryVal = Number(minSalary);
      if (!isNaN(salaryVal)) {
        query.salary = { $gte: salaryVal };
      }
    }

    const jobs = await Job.find(query).sort({ deadline: 1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Server error fetching jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Get Job By ID Error:", error);
    res.status(500).json({ message: "Server error fetching job details" });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, experienceRequired, skillsRequired, applyUrl, deadline } = req.body;

    const skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired
      ? skillsRequired.split(",").map((s) => s.trim())
      : [];

    const job = new Job({
      title,
      company,
      location: location || "Remote",
      salary: Number(salary),
      experienceRequired,
      skillsRequired: skillsArray,
      applyUrl,
      deadline: new Date(deadline),
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ message: "Server error creating job posting" });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    const { title, company, location, salary, experienceRequired, skillsRequired, applyUrl, deadline } = req.body;

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location !== undefined ? location : job.location;
    job.salary = salary !== undefined ? Number(salary) : job.salary;
    job.experienceRequired = experienceRequired || job.experienceRequired;
    job.applyUrl = applyUrl || job.applyUrl;
    job.deadline = deadline ? new Date(deadline) : job.deadline;

    if (skillsRequired) {
      job.skillsRequired = Array.isArray(skillsRequired)
        ? skillsRequired
        : skillsRequired.split(",").map((s) => s.trim());
    }

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ message: "Server error updating job posting" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job posting deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ message: "Server error deleting job posting" });
  }
};



const getInternships = async (req, res) => {
  try {
    const { search, location, minStipend } = req.query;
    let query = {};

    if (search && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skillsRequired: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    if (minStipend) {
      const stipendVal = Number(minStipend);
      if (!isNaN(stipendVal)) {
        query.stipend = { $gte: stipendVal };
      }
    }

    const internships = await Internship.find(query).sort({ deadline: 1 });
    res.status(200).json(internships);
  } catch (error) {
    console.error("Get Internships Error:", error);
    res.status(500).json({ message: "Server error fetching internships" });
  }
};

const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship posting not found" });
    }
    res.status(200).json(internship);
  } catch (error) {
    console.error("Get Internship By ID Error:", error);
    res.status(500).json({ message: "Server error fetching internship details" });
  }
};

const createInternship = async (req, res) => {
  try {
    const { title, company, location, stipend, duration, skillsRequired, applyUrl, deadline } = req.body;

    const skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired
      ? skillsRequired.split(",").map((s) => s.trim())
      : [];

    const internship = new Internship({
      title,
      company,
      location: location || "Remote",
      stipend: Number(stipend),
      duration,
      skillsRequired: skillsArray,
      applyUrl,
      deadline: new Date(deadline),
    });

    const createdInternship = await internship.save();
    res.status(201).json(createdInternship);
  } catch (error) {
    console.error("Create Internship Error:", error);
    res.status(500).json({ message: "Server error creating internship" });
  }
};

const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship posting not found" });
    }

    const { title, company, location, stipend, duration, skillsRequired, applyUrl, deadline } = req.body;

    internship.title = title || internship.title;
    internship.company = company || internship.company;
    internship.location = location !== undefined ? location : internship.location;
    internship.stipend = stipend !== undefined ? Number(stipend) : internship.stipend;
    internship.duration = duration || internship.duration;
    internship.applyUrl = applyUrl || internship.applyUrl;
    internship.deadline = deadline ? new Date(deadline) : internship.deadline;

    if (skillsRequired) {
      internship.skillsRequired = Array.isArray(skillsRequired)
        ? skillsRequired
        : skillsRequired.split(",").map((s) => s.trim());
    }

    const updatedInternship = await internship.save();
    res.status(200).json(updatedInternship);
  } catch (error) {
    console.error("Update Internship Error:", error);
    res.status(500).json({ message: "Server error updating internship" });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship posting not found" });
    }

    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Internship posting deleted successfully" });
  } catch (error) {
    console.error("Delete Internship Error:", error);
    res.status(500).json({ message: "Server error deleting internship" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
};
