const router = require("express").Router();
const authRoutes = require("./auth");
const tickerRoutes = require("./ticker");

router.use("/auth", authRoutes);
router.use("/ticker", tickerRoutes);

module.exports = router;
