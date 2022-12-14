const axios = require("axios");
const User = require("../models/userSchema");

module.exports.transactions = async function (req, res) {
  //async await
  try {
    // getting address of user from params
    const address = req.params.address;

    // getting transaction details
    const transactionDetail = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.API_KEY}`
    );

    const listOfTransaction = transactionDetail.data.result;
    let user = await User.findOne({ address: address });

    if (!user) {
      // creating new user
      user = await User.create({
        address: address,
        transations: listOfTransaction,
      });
    } else {
      // updating existing user
      let transaction = [...user.transations, ...listOfTransaction];
      user.transations = transaction;
    }
    user.save();

    return res.send({
      success: true,
      address: address,
      data: user.transations,
      message: "Transaction detail",
    });
  } catch (err) {
    console.log("Error in finding Transaction detail", err);
    return res.send({
      success: false,
      message: "Error in finding Transaction detail",
    });
  }
};

module.exports.balance = async function (req, res) {
  //async await
  try {
    // getting address of user from params
    const address = req.params.address;

    // Finding user
    let user = await User.findOne({ address: address });

    if (!user) {
      //user not found
      return res.send({
        success: true,
        address: address,
        message: "No User Found",
      });
    } else {
      // Getting transaction of the user
      let transaction = user.transations;

      var currentBalance = 0;

      for (let trans of transaction) {
        if (trans.from == address) {
          currentBalance -= parseInt(trans.value);
        } else {
          currentBalance += parseInt(trans.value);
        }
      }
    }

    const getPrice = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );

    const currentPrice = getPrice.data.ethereum;

    return res.send({
      success: true,
      address: address,
      currentBalance: currentBalance,
      currentPrice: currentPrice,
      message: "Balance detail",
    });
  } catch (err) {
    console.log("Error in finding Balance detail", err);
    return res.send({
      success: false,
      message: "Error in finding Balance detail",
    });
  }
};
