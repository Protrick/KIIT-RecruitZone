import Company from "../models/Company.js";


export const createCompany = async (req, res) => {
  const company = new Company(req.body);

  await company.save();

  res.status(201).json({
    message: "Placement drive created successfully",
    company,
  });
};


export const getCompanies = async (req, res) => {
  const companies = await Company.find().sort({ createdAt: -1 });

  res.status(200).json(companies);
};


export const getCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    return res.status(404).json({
      message: "Company drive not found",
    });
  }

  res.status(200).json(company);
};


export const updateCompany = async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!company) {
    return res.status(404).json({
      message: "Company drive not found",
    });
  }

  res.status(200).json({
    message: "Company updated successfully",
    company,
  });
};


export const deleteCompany = async (req, res) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return res.status(404).json({
      message: "Company drive not found",
    });
  }

  res.status(200).json({
    message: "Company deleted successfully",
  });
};