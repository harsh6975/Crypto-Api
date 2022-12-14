const axios = require("axios");

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

    return res.send({
      success: true,
      address: address,
      data: listOfTransaction,
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
