import express from "express";
import * as companyController from "../controllers/companyController.js";

const router = express.Router();

router.post("/", companyController.createCompany);

router.get("/", companyController.getCompanies);

router.get("/:id", companyController.getCompany);

router.put("/:id", companyController.updateCompany);

router.delete("/:id", companyController.deleteCompany);

export default router;