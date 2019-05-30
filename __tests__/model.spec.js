const request = require("supertest");
const db = require("../data/dbConfig.js");
const Users = require("../users/users-model.js");

describe("test environment is working", () => {
  it("test", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("database model", () => {
  beforeAll(async () => {
    await db("users").truncate();
  });

  afterEach(async () => {
    await db("users").truncate();
  });

  describe("insert()", () => {
    it("should insert provided data", async () => {
      await Users.insert({ username: "test", password: "password" });

      const database = await db("users");

      expect(database).toHaveLength(1);
    });
  });
});
