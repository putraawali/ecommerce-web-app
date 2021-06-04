const request = require("supertest");
const app = require("../app.js");
const { User } = require("../models");
const { getToken } = require("../helpers/jwt");

let admin_access_token = "";
let customer_access_token = "";

beforeAll((done) => {
  User.findOne({
    where: {
      email: "admin-putra@mail.com",
    },
  })
    .then((admin) => {
      let payloadAdmin = {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        isAdmin: admin.isAdmin,
      };
      admin_access_token = getToken(payloadAdmin);
      return User.findOne({
        where: {
          email: "putra@mail.com",
        },
      });
    })
    .then((nonAdmin) => {
      let payloadNotAdmin = {
        id: nonAdmin.id,
        email: nonAdmin.email,
        username: nonAdmin.username,
        isAdmin: nonAdmin.isAdmin,
      };
      customer_access_token = getToken(payloadNotAdmin);
      done();
    })
    .catch((err) => done(err));
});

let dataToPost = {
  name: "Ibanez",
  price: 10000000,
  stock: 10,
  image_url:
    "https://2.bp.blogspot.com/-sI2-0Gluttg/W0j5ZLxpdUI/AAAAAAAAtRo/pROwQUuXRw0sY_kUP5qZFdJQsCwteEpbACLcBGAs/s1600/malaysia-traditional-wear-baju-kurung-tiered-sleeves-top-songket-kate-spade-piano-clutch-5.jpg",
  category: "Guitar",
};
let idPosted = 0;

describe("POST /products test", () => {
  it("Success test for post", (done) => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(dataToPost)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        idPosted = body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", dataToPost.name);
        expect(body).toHaveProperty("price", dataToPost.price);
        expect(body).toHaveProperty("stock", dataToPost.stock);
        expect(body).toHaveProperty("image_url", dataToPost.image_url);
        expect(body).toHaveProperty("category", dataToPost.category);
        expect(body).toHaveProperty("status", true);
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for post without access_token", (done) => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .send(dataToPost)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please login first");
        expect(body).toEqual({ message: "Please login first" });
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for post non admin", (done) => {
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", customer_access_token)
      .send(dataToPost)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You are not admin");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for post with empty input", (done) => {
    let failWarningAllEmpty = [
      "Product name is required",
      "Please input image using url format",
      "Price is required",
      "Stock is required",
      "Category is required",
    ];
    let dataAllEmpty = {
      name: "",
      price: "",
      stock: "",
      image_url: "",
      category: "",
    };
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(dataAllEmpty)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          expect.arrayContaining(failWarningAllEmpty)
        );
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for post stock and price less then 0", (done) => {
    let data = {
      name: "Ibanez",
      price: -1,
      stock: -1,
      image_url:
        "https://2.bp.blogspot.com/-sI2-0Gluttg/W0j5ZLxpdUI/AAAAAAAAtRo/pROwQUuXRw0sY_kUP5qZFdJQsCwteEpbACLcBGAs/s1600/malaysia-traditional-wear-baju-kurung-tiered-sleeves-top-songket-kate-spade-piano-clutch-5.jpg",
      category: "Guitar",
    };
    let arrErr = ["Price minimum is 0", "Stock minimum is 0"];
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(data)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.arrayContaining(arrErr));
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for post input not equal", (done) => {
    let data = {
      name: "Ibanez",
      price: "w",
      stock: "w",
      image_url: "w",
      category: "Guitar",
    };
    let arrErr = [
      "Price must be number",
      "Stock must be number",
      "Please input image using url format",
    ];
    return request(app)
      .post("/products")
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(data)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.arrayContaining(arrErr));
        done();
      })
      .catch((err) => done(err));
  });
});

describe('PATCH /products/"id test', () => {
  let toPatch = {
    status: false,
  };
  it("Success test for patch", (done) => {
    return request(app)
      .patch(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(toPatch)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", dataToPost.name);
        expect(body).toHaveProperty("price", dataToPost.price);
        expect(body).toHaveProperty("stock", dataToPost.stock);
        expect(body).toHaveProperty("image_url", dataToPost.image_url);
        expect(body).toHaveProperty("category", dataToPost.category);
        expect(body).toHaveProperty("status", false);
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for patch without access token", (done) => {
    return request(app)
      .patch(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .send(toPatch)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please login first");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test for patch non admin access token", (done) => {
    return request(app)
      .patch(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", customer_access_token)
      .send(toPatch)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You are not admin");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /products/:id test", () => {
  it("Success test for get by id", (done) => {
    return request(app)
      .get(`/products/get/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", dataToPost.name);
        expect(body).toHaveProperty("price", dataToPost.price);
        expect(body).toHaveProperty("stock", dataToPost.stock);
        expect(body).toHaveProperty("image_url", dataToPost.image_url);
        expect(body).toHaveProperty("category", dataToPost.category);
        expect(body).toHaveProperty("status", body.status);
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test without access token", (done) => {
    return request(app)
      .get(`/products/get/${idPosted}`)
      .set("Accept", "application/json")
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please login first");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test with non admin access token", (done) => {
    return request(app)
      .get(`/products/get/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", customer_access_token)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You are not admin");
        done();
      })
      .catch((err) => done(err));
  });
});

let dataToPut = {
  name: "Yamaha",
  price: 10000,
  stock: 15,
  image_url:
    "https://2.bp.blogspot.com/-JgUbW5ivfJs/TaGL3OMy42I/AAAAAAAABFc/kF5UWzL2Atw/w1200-h630-p-k-no-nu/P2010140.JPG",
  status: true,
  category: "Bass",
};
describe("PUT /products/:id test", () => {
  it("Success test for put", (done) => {
    return request(app)
      .put(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(dataToPut)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", dataToPut.name);
        expect(body).toHaveProperty("price", dataToPut.price);
        expect(body).toHaveProperty("stock", dataToPut.stock);
        expect(body).toHaveProperty("image_url", dataToPut.image_url);
        expect(body).toHaveProperty("status", dataToPut.status);
        expect(body).toHaveProperty("category", dataToPut.category);
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test without access token", (done) => {
    return request(app)
      .put(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .send(dataToPut)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please login first");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test with non admin access token", (done) => {
    return request(app)
      .put(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", customer_access_token)
      .send(dataToPut)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You are not admin");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test with stock and price below 0", (done) => {
    let data = {
      name: "Baju",
      price: -1,
      stock: -1,
      image_url:
        "https://2.bp.blogspot.com/-sI2-0Gluttg/W0j5ZLxpdUI/AAAAAAAAtRo/pROwQUuXRw0sY_kUP5qZFdJQsCwteEpbACLcBGAs/s1600/malaysia-traditional-wear-baju-kurung-tiered-sleeves-top-songket-kate-spade-piano-clutch-5.jpg",
    };
    let arrErr = ["Price minimum is 0", "Stock minimum is 0"];
    return request(app)
      .put(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(data)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.arrayContaining(arrErr));
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test post input not equal", (done) => {
    let data = {
      name: "Baju",
      price: "w",
      stock: "w",
      image_url: "w",
    };
    let arrErr = [
      "Price must be number",
      "Stock must be number",
      "Please input image using url format",
    ];
    return request(app)
      .put(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .send(data)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.arrayContaining(arrErr));
        done();
      })
      .catch((err) => done(err));
  });
});

describe("DELETE /products/:id test", () => {
  it("Success test for delete", (done) => {
    return request(app)
      .delete(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", admin_access_token)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Product deleted successfully");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test without access token", (done) => {
    return request(app)
      .delete(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please login first");
        done();
      })
      .catch((err) => done(err));
  });
  it("Fail test with non admin access token", (done) => {
    return request(app)
      .delete(`/products/${idPosted}`)
      .set("Accept", "application/json")
      .set("access_token", customer_access_token)
      .then((res) => {
        let body = res.body;
        let status = res.status;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "You are not admin");
        done();
      })
      .catch((err) => done(err));
  });
});
