const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../server.js");

describe("Authentication endpoints", () => {
  describe("POST (register)", () => {
    beforeAll(async () => {
      await db("users").truncate();
    });

    afterEach(async () => {
      await db("users").truncate();
    });

    it("it should return a JSON object", async () => {
      const users = {
        username: "test",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(users);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });

    it("it should return a JSON object", async () => {
      const users = {
        username: "test",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(users);
      expect(res.status).toBe(201);
    });
  });

  describe("POST (login)", () => {
    beforeAll(async () => {
      await db("users").truncate();
    });

    it("it should return a JSON object", async () => {
      const users = {
        username: "test",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/register")
        .send(users);
      expect(res.status).toBe(201);
    });

    it("it should return a JSON object", async () => {
      const users = {
        username: "test",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/login")
        .send(users);
      expect(res.status).toBe(200);
    });

    it("it should return a JSON object", async () => {
      const users = {
        username: "test",
        password: "password"
      };
      const res = await request(server)
        .post("/api/auth/login")
        .send(users);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });
  });
});

describe("Classroom endpoints", () => {
  describe("POST", () => {
    // it("it should return a JSON object", async () => {
    //   const users = {
    //     username: "trish",
    //     password: "password"
    //   };
    //   const res = await request(server)
    //     .post("/api/auth/register")
    //     .send(users);
    //   expect(res.status).toBe(201);
    // });

    // it("it should return a JSON object", async () => {
    //   const users = {
    //     username: "trish",
    //     password: "password"
    //   };
    //   const res = await request(server)
    //     .post("/api/auth/login")
    //     .send(users);
    //   expect(res.status).toBe(200);
    // });

    it("it should return a JSON object", async () => {
      const body = {
        classroom_name: "test classroom"
      };
      const res = await request(server)
        .post("/api/classrooms")
        .send(body);
      expect(res.headers["content-type"]).toMatch(/json/i);
    });

    // it("it should return 200 status code", async () => {
    //   const body = {
    //     classroom_name: "test classroom",
    //     score: 0,
    //     highest_score: 0
    //   };
    //   const res = await request(server)
    //     .post("/api/classrooms")
    //     .send(body);
    //   console.log(res);
    //   expect(res.status).toBe(200);
    // });
  });

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
});
