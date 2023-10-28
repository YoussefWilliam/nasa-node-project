const request = require("supertest");
const app = require("../../app");
const { getSpecificLaunchById } = require("../../models/launches.model");

describe("Test Get /launches", () => {
  test("It should response with 200 status", async () => {
    await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST /launches", () => {
  const requestBody = {
    mission: "USS Enterprise",
    destination: "Uranus",
    rocket: "Space X 213-c",
    launchDate: "January 4, 1994",
  };
  const incompleteRequestBody = {
    mission: "USS Enterprise",
    destination: "Uranus",
    rocket: "Space X 213-c",
  };

  const inValidLaunchDateRequestBody = {
    mission: "USS Enterprise",
    destination: "Uranus",
    rocket: "Space X 213-c",
    launchDate: "What a perfect day for a swim!",
  };
  test("It should response with 201 created status", async () => {
    const response = await request(app)
      .post("/launches")
      .send(requestBody)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject({
      mission: "USS Enterprise",
      destination: "Uranus",
      rocket: "Space X 213-c",
    });
    const reqDate = new Date(requestBody.launchDate);
    const resDate = new Date(response.body.launchDate);

    expect(reqDate).toStrictEqual(resDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(incompleteRequestBody)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property!",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(inValidLaunchDateRequestBody)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Date format",
    });
  });
});

describe("Test DELETE /launches", () => {
  const existingLaunchId = 10;
  const unKnownLaunchId = 1000;
  const deletedLaunch = getSpecificLaunchById(existingLaunchId);
  console.log(
    "🚀 ~ file: launches.test.js:80 ~ describe ~ deletedLaunch:",
    deletedLaunch
  );
  test("It should response with 200 status", async () => {
    const response = await request(app)
      .delete(`/launches/${existingLaunchId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toStrictEqual({
      message: `Launch of mission ${deletedLaunch.mission} and flight number of ${deletedLaunch.flightNumber} is deleted successfully!`,
    });
  });

  test("It should catch if launch does not exist", async () => {
    const response = await request(app)
      .delete(`/launches/${unKnownLaunchId}`)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Launch is not found or id is invalid",
    });
  });
});
