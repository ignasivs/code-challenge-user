import chai from "chai";
import chaiHttp from "chai-http";
import {
  createUsers,
  deleteUsersById,
  getUsers,
  getUsersById,
  updateUsersById
} from "../src/v1/controllers/users";
import app from "../src/bin/www";

let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

const url = "http://localhost:7300/users";

describe("Test exist functions and create database", function() {
  before(function() {
    // runs before all tests in this block
    return require("../src/v1/models").sequelize.sync();
  });
  it("should exist createUsers via expect()", function() {
    expect(createUsers).to.be.a("function");
  });
  it("should exist deleteUsersById via expect()", function() {
    expect(deleteUsersById).to.be.a("function");
  });
  it("should exist getUsers via expect()", function() {
    expect(getUsers).to.be.a("function");
  });
  it("should exist getUsersById via expect()", function() {
    expect(getUsersById).to.be.a("function");
  });
  it("should exist updateUsersById via expect()", function() {
    expect(updateUsersById).to.be.a("function");
  });
});

describe("createUser: ", () => {
  it("should return 201", done => {
    chai
      .request(url)
      .post("/createUsers")
      .send({
        name: "Ignacio",
        email: "ignasi44@hotmail.com",
        birthDate: "2019-05-23",
        address: {
          street: "Avenida Valencia",
          state: "Castellón",
          city: "Castellón",
          country: "España",
          zip: "12006"
        }
      })
      .end(function(err, res) {
        expect(res).to.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("schema");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("CREATED");

        //schema
        res.body.schema.should.be.a("object");
        expect(res.body.schema).to.have.property("address");
        res.body.schema.address.should.be.a("object");
        expect(res.body.schema).to.have.property("name");
        res.body.schema.name.should.be.eql("Ignacio");

        done();
      });
  });
  it("should return 400, no name", done => {
    chai
      .request(url)
      .post("/createUsers")
      .send({
        email: "ignasi44@hotmail.com",
        birthDate: "2019-05-23",
        address: {
          street: "Avenida Valencia",
          state: "Castellón",
          city: "Castellón",
          country: "España",
          zip: "12006"
        }
      })
      .end(function(err, res) {
        expect(res).to.have.status(400);
        res.should.be.json;
        done();
      });
  });
});

describe("getUsers: ", () => {
  it("should return 200", done => {
    chai
      .request(url)
      .get("/getusers")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("schema");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("OK");

        //schema
        res.body.schema.should.be.a("Array");
        res.body.schema.length.should.be.eql(1);

        done();
      });
  });
});

describe("updateUsersById: ", () => {
  it("should return 200", done => {
    chai
      .request(url)
      .put("/updateUsersById/1")
      .send({
        name: "Ignacio editado",
        email: "ignasi44@hotmail.com",
        birthDate: "2019-05-23",
        address: {
          street: "Avenida Valencia",
          state: "Castellón de la Plana",
          city: "Castellón",
          country: "España",
          zip: "12005"
        }
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("OK");

        done();
      });
  });
  it("should return 404", done => {
    chai
      .request(url)
      .put("/updateUsersById/123")
      .set("Accept-Language", "en")
      .send({
        name: "Ignacio editado",
        email: "ignasi44@hotmail.com",
        birthDate: "2019-05-23",
        address: {
          street: "Avenida Valencia",
          state: "Castellón de la Plana",
          city: "Castellón",
          country: "España",
          zip: "12005"
        }
      })
      .end(function(err, res) {
        expect(res).to.have.status(404);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("User not found");

        done();
      });
  });
  it("should return 400", done => {
    chai
      .request(url)
      .put("/updateUsersById/rfgs")
      .send({
        name: "Ignacio editado",
        email: "ignasi44@hotmail.com",
        birthDate: "2019-05-23",
        address: {
          street: "Avenida Valencia",
          state: "Castellón de la Plana",
          city: "Castellón",
          country: "España",
          zip: "12005"
        }
      })
      .end(function(err, res) {
        expect(res).to.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");

        done();
      });
  });
});

describe("getUsersById: ", () => {
  it("should return 200", done => {
    chai
      .request(url)
      .get("/getusersById/1")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");
        expect(res.body).to.have.property("schema");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("OK");

        //schema
        res.body.schema.should.be.a("object");
        expect(res.body.schema).to.have.property("address");
        res.body.schema.address.should.be.a("object");
        expect(res.body.schema.address).to.have.property("zip");
        res.body.schema.address.zip.should.be.eql("12005");
        expect(res.body.schema).to.have.property("name");
        res.body.schema.name.should.be.eql("Ignacio editado");

        done();
      });
  });
  it("should return 404", done => {
    chai
      .request(url)
      .get("/getusersById/123")
      .set("Accept-Language", "en")
      .end(function(err, res) {
        expect(res).to.have.status(404);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("User not found");

        done();
      });
  });
  it("should return 400", done => {
    chai
      .request(url)
      .get("/getusersById/radfaf")
      .end(function(err, res) {
        expect(res).to.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");

        done();
      });
  });
});

describe("deleteUsersById: ", () => {
  it("should return 200", done => {
    chai
      .request(url)
      .delete("/deleteUsersById/1")
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("OK");

        done();
      });
  });
  it("should return 404", done => {
    chai
      .request(url)
      .delete("/deleteUsersById/123")
      .set("Accept-Language", "en")
      .end(function(err, res) {
        expect(res).to.have.status(404);
        res.should.be.json;
        res.body.should.be.a("object");
        expect(res.body).to.have.property("description");

        //description
        res.body.description.should.be.a("string");
        res.body.description.should.be.eql("User not found");

        done();
      });
  });
  it("should return 400", done => {
    chai
      .request(url)
      .delete("/deleteUsersById/rfgs")
      .end(function(err, res) {
        expect(res).to.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");

        done();
      });
  });
});
