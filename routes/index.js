const express = require("express");
const router = express.Router();

const gayaHidupRoutes = require("./gayaHidupRoutes");
const olahRagaRoutes = require("./olahRagaRoutes");
const teknologiRoutes = require("./teknologiRoutes");
const politikRoutes = require("./politikRoutes");
const lainnyaRoutes = require("./lainnyaRoutes");
const kesehatanRoutes = require("./kesehatanRoutes");
const bisnisRoutes = require("./bisnisRoutes");
const authRoutes = require("./authRoutes");

router.use("/gayaHidup", gayaHidupRoutes);
router.use("/olahRaga", olahRagaRoutes);
router.use("/teknologi", teknologiRoutes);
router.use("/politik", politikRoutes);
router.use("/lainnya", lainnyaRoutes);
router.use("/kesehatan", kesehatanRoutes);
router.use("/bisnis", bisnisRoutes);
router.use("/auth", authRoutes);

module.exports = router;
