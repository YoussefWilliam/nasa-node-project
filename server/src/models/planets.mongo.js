const mongoose = require("mongoose");

const planetsSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

// Connecting planets schema with "planets" collection
module.exports = mongoose.model("Planet", planetsSchema);
