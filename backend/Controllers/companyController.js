const Company = require("../models/Company");

const getCompanies = async (req, res) => {
  try {
    const { branch, maxCGPA, minCtc, search, status } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { roles: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (status && status.trim() !== "") {
      query.status = status;
    }

    if (maxCGPA) {
      const cgpaNum = Number(maxCGPA);
      if (!isNaN(cgpaNum)) {
        query["eligibilityCriteria.minCGPA"] = { $lte: cgpaNum };
      }
    }

    if (branch && branch.trim() !== "") {
      query["eligibilityCriteria.allowedBranches"] = {
        $in: [new RegExp(`^${branch}$`, "i")],
      };
    }

    if (minCtc) {
      const ctcNum = Number(minCtc);
      if (!isNaN(ctcNum)) {
        query.ctc = { $gte: ctcNum };
      }
    }

    const companies = await Company.find(query).sort({ deadline: 1 });

    res.status(200).json(companies);
  } catch (error) {
    console.error("Get Companies Error:", error);
    res.status(500).json({
      message: "Server error retrieving company drives",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company drive not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Get Company By ID Error:", error);
    res.status(500).json({
      message: "Server error retrieving drive details",
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      logo,
      roles,
      ctc,
      driveDate,
      deadline,
      status,
    } = req.body;

    // eligibilityCriteria arrives nested from the frontend:
    // { eligibilityCriteria: { minCGPA, allowedBranches } }
    const minCGPA = req.body.eligibilityCriteria?.minCGPA;
    const allowedBranches = req.body.eligibilityCriteria?.allowedBranches;

    const rolesArray = Array.isArray(roles)
      ? roles
      : roles
      ? roles.split(",").map((r) => r.trim())
      : [];

    const branchesArray = Array.isArray(allowedBranches)
      ? allowedBranches
      : allowedBranches
      ? allowedBranches.split(",").map((b) => b.trim())
      : [];

    const company = new Company({
      companyName,
      logo: logo || "",
      roles: rolesArray,
      ctc: Number(ctc),
      eligibilityCriteria: {
        minCGPA: Number(minCGPA) || 0.0,
        allowedBranches: branchesArray,
      },
      driveDate: new Date(driveDate),
      deadline: new Date(deadline),
      status: status || "Upcoming",
    });

    const createdCompany = await company.save();

    res.status(201).json(createdCompany);
  } catch (error) {
    console.error("Create Company Error:", error);
    res.status(500).json({
      message: "Server error creating company drive",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company drive not found",
      });
    }

    const {
      companyName,
      logo,
      roles,
      ctc,
      driveDate,
      deadline,
      status,
    } = req.body;

    // eligibilityCriteria arrives nested from the frontend:
    // { eligibilityCriteria: { minCGPA, allowedBranches } }
    const minCGPA = req.body.eligibilityCriteria?.minCGPA;
    const allowedBranches = req.body.eligibilityCriteria?.allowedBranches;

    company.companyName = companyName || company.companyName;
    company.logo = logo !== undefined ? logo : company.logo;
    company.ctc = ctc !== undefined ? Number(ctc) : company.ctc;
    company.driveDate = driveDate ? new Date(driveDate) : company.driveDate;
    company.deadline = deadline ? new Date(deadline) : company.deadline;
    company.status = status || company.status;

    if (roles) {
      company.roles = Array.isArray(roles)
        ? roles
        : roles.split(",").map((r) => r.trim());
    }

    if (minCGPA !== undefined || allowedBranches) {
      company.eligibilityCriteria = {
        minCGPA:
          minCGPA !== undefined
            ? Number(minCGPA)
            : company.eligibilityCriteria.minCGPA,
        allowedBranches: allowedBranches
          ? Array.isArray(allowedBranches)
            ? allowedBranches
            : allowedBranches.split(",").map((b) => b.trim())
          : company.eligibilityCriteria.allowedBranches,
      };
    }

    const updatedCompany = await company.save();

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Update Company Error:", error);
    res.status(500).json({
      message: "Server error updating company drive",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company drive not found",
      });
    }

    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Company drive removed successfully",
    });
  } catch (error) {
    console.error("Delete Company Error:", error);
    res.status(500).json({
      message: "Server error deleting company drive",
    });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};