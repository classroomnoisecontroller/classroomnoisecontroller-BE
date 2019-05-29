const request = require("supertest");

const server = require("../server.js");

describe("User data endpoints", () => {
  // you want items to still be there and make sure things are cleaned up before every test is run.

  describe("GET", () => {
    it("it should return 200 status code", async () => {
      // use the squad
      const res = await request(server).get("/api/auth");
      // console.log(res);
      expect(res.status).toBe(200);
    });

    it("it should return a JSON object", async () => {
      const res = await request(server).get("/api/auth");
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });

  describe("/post (login)", () => {
    it("it should return 200 status code", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "password" });

      console.log(res.status);
      expect(res.status).toBe(200);
    });

    it("it should return a JSON object", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "password" });
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });
});
