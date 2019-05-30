const request = require("supertest");
const server = require("../server.js");

describe("Authentication endpoints", () => {
  describe("POST (login)", () => {
    it("it should return a JSON object", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "password" });
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });

  describe("POST (register)", () => {
    it("it should return a JSON object", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "password" });
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });
});

describe("Classroom endpoints", () => {
  describe("GET (list of classrooms)", () => {
    it("it should return a JSON object", async () => {
      const res = await request(server).get("/api/classrooms");
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });

  describe("GET (individual classrooms)", () => {
    it("it should return a JSON object", async () => {
      const res = await request(server).get("/api/classrooms/1");
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });

  describe("POST", () => {
    it("it should return a JSON object when posting a new classroom", async () => {
      const res = await request(server)
        .post("/api/classrooms")
        .send({ classroom_name: "test classroom" });
      // console.log(res);
      // console.log(res.headers);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });
});
