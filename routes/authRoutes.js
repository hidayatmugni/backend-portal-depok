const express = require("express");
const { register, login, forgotPassword, resetPassword } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router di lindungi
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Akses berhasil, selamat datang!", user: req.user });
});
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
