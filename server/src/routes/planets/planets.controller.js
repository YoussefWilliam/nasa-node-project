const { getAllPlanetsData } = require("../../models/planets.model");

const httpGetAllPlanets = (req, res) => {
  return res.status(200).json(getAllPlanetsData());
};

module.exports = {
  httpGetAllPlanets,
};
