const router = require("express").Router();
const axios = require("axios");
const watchController = require("../../controllers/watchController");
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

// @route     PUT api/ticker/follow/:id
// @desc      Add symbol to user watched tickers
// @access    Private
router.put("/follow/:id", watchController.watchStock);

// @route     PUT api/ticker/follow/:id
// @desc      Add symbol to user watched tickers
// @access    Private
router.put("/unfollow/:id", watchController.unwatchStock);

// @route     GET api/ticker/symbols/:id
// @desc      Get all user followed symbols
// @access    Private
router.get("/symbols/:id", watchController.getSymbols);

module.exports = router;
