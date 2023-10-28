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
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing required launch property!",
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date format",
    });
  }

  addNewLaunch(launch);

  return res.status(201).json(launch);
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
