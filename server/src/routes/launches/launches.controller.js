const {
  getAllLaunchesData,
  addNewLaunch,
  checkIfLaunchExist,
  removeLaunch,
  getSpecificLaunchById,
} = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunchesData());
};

const httpPostNewLaunch = (req, res) => {
  console.log("here is the reqqqq::::", req.body);
  if (!req.body) {
    return res.status(400).json({
      error: "Missing a body",
    });
  }

  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  addNewLaunch(launch);

  return res.status(200).json(launch);
};

const httpDeleteLaunch = (req, res) => {
  const id = req.params.id;

  if (!id || !checkIfLaunchExist(id)) {
    return res.status(400).json({
      error: "Launch is not found or id is invalid",
    });
  }

  const deletedLaunch = getSpecificLaunchById(id);
  removeLaunch(id);

  return res.status(200).json({
    message: `Launch of mission ${deletedLaunch.mission} and flight number of ${id} is deleted successfully!`,
  });
};
module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpDeleteLaunch,
};
