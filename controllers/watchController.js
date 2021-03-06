const User = require("../models/User");

module.exports = {
  // Add ticker symbol to user's followedSymbols
  watchStock: async (req, res) => {
    const id = req.params.id;
    const symbol = req.body.symbol;
    try {
      const user = await User.findOne({ _id: id });

      user.followedSymbols.push(symbol);

      await user.save();

      res.send(user.followedSymbols);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  // Remove ticker symbol from user's followedSymbols
  unwatchStock: async (req, res) => {
    const id = req.params.id;
    const symbol = req.body.symbol;

    try {
      const user = await User.findOne({ _id: id });

      const { followedSymbols } = user;

      let updatedArray = [];

      for (let i = 0; i < followedSymbols.length; i++) {
        if (followedSymbols[i] !== symbol) {
          updatedArray.push(followedSymbols[i]);
        }
      }

      user.followedSymbols = updatedArray;

      await user.save();

      res.send(user.followedSymbols);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  // Retrieve user followedSymbols from db
  getSymbols: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne({ _id: id });

      res.send(user.followedSymbols);
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
