const router = require("express").Router();
const axios = require("axios");
const auth = require("../../middleware/auth");
const baseURL = "https://cloud.iexapis.com/stable/stock/";
const searchQuery = "/batch?types=quote,news,chart&range=1m&last=10&token=";
require("dotenv").config();

// @route     GET api/ticker/query/:ticker
// @desc      Get ticker data
// @access    Private
router.get("/query/:ticker", async (req, res) => {
  const ticker = req.params.ticker;

  try {
    const response = await axios.get(
      baseURL + ticker + searchQuery + process.env.IEX_KEY
    );

    res.send(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
