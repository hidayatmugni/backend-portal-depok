const express = require("express");
const router = express.Router();
const { getAllNews, createNews, updateNews, deleteNews, searchNews } = require("../controllers/bisnisController");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.get("/", getAllNews);
router.get("/search", searchNews);
router.post("/", uploadMiddleware, createNews);
router.put("/:id", uploadMiddleware, updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
