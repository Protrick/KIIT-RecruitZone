const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  registerUser,
  loginUser,
  updateUserProfile,
  refreshToken,
  logout,
} = require("../Controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads/resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `resume-${req.user._id}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype =
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDFs and Word Documents (.doc, .docx) are allowed!"));
    }
  },
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

router.put(
  "/profile",
  protect,
  upload.single("resume"),
  updateUserProfile
);

module.exports = router;