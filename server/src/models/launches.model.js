const launches = new Map();

const launch1 = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
const launch2 = {
  flightNumber: 26,
  mission: "A great mission with no purpose",
  rocket: "Explorer ZIZ",
  launchDate: new Date("December 27, 2012"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

const launch3 = {
  flightNumber: 10,
  mission: "Apollo Moon Exploration",
  rocket: "Apollo 13",
  launchDate: new Date("November 11, 1997"),
  destination: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: false,
  success: true,
};

launches.set(launch1.flightNumber, launch1);
launches.set(launch2.flightNumber, launch2);
launches.set(launch3.flightNumber, launch3);

const getAllLaunchesData = () => Array.from(launches.values());

const addNewLaunch = (launch) => {
  const lastFlightNumber = [...launches.values()].pop().flightNumber;
  const updatedFlightNumber = lastFlightNumber + 1;
  launches.set(
    updatedFlightNumber,
    Object.assign(launch, {
      flightNumber: updatedFlightNumber,
      success: true,
      upcoming: true,
      customers: ["Testing", "NASA"],
    })
  );
};

const checkIfLaunchExist = (id) => {
  return launches.has(parseInt(id));
};

const removeLaunch = (id) => {
  launches.delete(parseInt(id));
};

const getSpecificLaunchById = (id) => {
  return launches.get(parseInt(id));
};

module.exports = {
  getAllLaunchesData,
  addNewLaunch,
  removeLaunch,
  checkIfLaunchExist,
  getSpecificLaunchById,
};
