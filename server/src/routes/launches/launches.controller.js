const { getAllLaunchesData } = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunchesData());
};

module.exports = {
  httpGetAllLaunches,
};
