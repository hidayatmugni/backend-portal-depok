const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Token dari header
  if (!token) return res.status(403).json({ message: "Akses ditolak, token tidak ada." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = verified; // Tambahkan data pengguna ke request
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid." });
  }
};

module.exports = verifyToken;
