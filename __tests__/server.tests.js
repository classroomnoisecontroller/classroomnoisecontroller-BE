const server = require("../server.js");
const request = require("supertest");

describe("test environment is working", () => {
  it("test", () => {
    //   await Database.insert({ name: "test" });

    //   const database = await db("database");

    //   expect(database).toHaveLength(1);
    expect(process.env.DB_ENV).toBe("testing");
  });
});
