const News = require("../models/olahragaModel");
const fs = require("fs").promises;
const path = require("path");

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error: error.message });
  }
};
// search news
exports.searchNews = async (req, res) => {
  try {
    const searchQuery = req.query.q || ""; // Mengambil query pencarian dari parameter `q`
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const news = await News.find({
      $or: [{ title: { $regex: searchQuery, $options: "i" } }, { description: { $regex: searchQuery, $options: "i" } }, { description_2: { $regex: searchQuery, $options: "i" } }],
    });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error searching news", error: error.message });
  }
};

// create news
exports.createNews = async (req, res) => {
  try {
    const { title, description, description_2, date, content, content_2, content_3, content_4, content_5 } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !description_2 || !date || !content || !content_2 || !content_3 || !content_4 || !content_5 || !imagePath) {
      if (req.file) {
        await deleteImage(req.file.path);
      }
      return res.status(400).json({ message: "All fields are required" });
    }

    const newNews = new News({
      title,
      description,
      description_2,
      image: imagePath,
      date,
      content,
      content_2,
      content_3,
      content_4,
      content_5,
    });

    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    if (req.file) {
      await deleteImage(req.file.path);
    }
    res.status(500).json({ message: "Error creating news", error: error.message });
  }
};

// Update News
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, description_2, date, content, content_2, content_3, content_4, content_5 } = req.body;

    const existingNews = await News.findById(id);
    if (!existingNews) {
      if (req.file) {
        const imagePath = path.join(__dirname, "..", req.file.path);
        await fs.unlink(imagePath); // Menghapus gambar yang baru diupload
      }
      return res.status(404).json({ message: "News not found" });
    }

    if (!title || !description || !description_2 || !date || !content || !content_2 || !content_3 || !content_4 || !content_5) {
      if (req.file) {
        const imagePath = path.join(__dirname, "..", req.file.path);
        await fs.unlink(imagePath); // Menghapus gambar yang baru diupload
      }
      return res.status(400).json({ message: "All fields are required" });
    }

    if (req.file) {
      if (existingNews.image) {
        const existingImagePath = path.join(__dirname, "..", existingNews.image);
        await fs.unlink(existingImagePath); // Menghapus gambar yang lama
      }
      existingNews.image = `/uploads/${req.file.filename}`;
    }

    existingNews.set({
      title: title || existingNews.title,
      description: description || existingNews.description,
      description_2: description_2 || existingNews.description_2,
      date: date || existingNews.date,
      content,
      content_2,
      content_3,
      content_4,
      content_5,
    });

    await existingNews.save();

    res.status(200).json(existingNews);
  } catch (error) {
    if (req.file) {
      const imagePath = path.join(__dirname, "..", req.file.path);
      await fs.unlink(imagePath); // Menghapus gambar yang baru diupload
    }
    res.status(500).json({ message: "Error updating news", error: error.message });
  }
};

// Delete News

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Hapus gambar jika ada
    const imagePath = path.join(__dirname, "..", news.image);

    try {
      // Cek jika file ada menggunakan fs.promises.access
      await fs.access(imagePath); // Cek file apakah bisa diakses (ada)
      await fs.unlink(imagePath); // Hapus file
    } catch (err) {
      console.log("Error accessing or deleting file:", err);
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error(error); // Tambahkan logging untuk memeriksa error
    res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};
