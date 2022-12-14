const axios = require("axios");

module.exports.price = async function (req, res) {
  //async await
  try {
    setInterval(async function () {
      const getPrice = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
      );
    }, 1000*60*10); 

    return res.send({
      success: true,
      message: "Router working and price fetching starts",
    });
  } catch (err) {
    console.log("Router not working");
    return res.send({
      success: false,
      message: "Router not working",
    });
  }
};
