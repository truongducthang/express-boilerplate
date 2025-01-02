const catchAsync = require('../../../core/utils/catchAsync');

const getPingPong = catchAsync(async (req, res) => {
  res.send("pong pong");
});

module.exports = {
  getPingPong,
};
