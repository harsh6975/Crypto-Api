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
