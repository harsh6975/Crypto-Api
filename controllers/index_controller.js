module.exports.checkRouterWorking = async function (req, res) {
  //async await
  try {
    console.log("Router working");
    return res.send({
      success: true,
      message: "Router working",
    });
  } catch (err) {
    console.log("Router not working");
    return res.send({
      success: false,
      message: "Router not working",
    });
  }
};
