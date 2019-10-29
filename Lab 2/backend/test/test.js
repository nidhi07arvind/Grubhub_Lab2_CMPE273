var expect = require("chai").expect;
var index = require("../index");
var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3001");
var request = require("request");

describe("login", function() {
  it("login", function(done) {
    server
      .post("/login")
      .send({ Email: "abc@gmail.com", Password: "abc", Profile: "Buyer" })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("signup", function() {
  it("signup", function(done) {
    server
      .post("/signup")
      .send({
        Email: "xyz@gmail.com",
        Password: "xyz",
        Profile: "Buyer",
        Restaurant
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("ownersigup", function() {
  it("ownersignup", function(done) {
    server
      .post("/ownersignup")
      .send({
        Email: "mno@gmail.com",
        FirstName: "Mocha Owner",
        Password: "mno",
        RestaurantName: "Mocha",
        ZipCode: "95050"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("Search", function() {
  it("AddItem", function(done) {
    server
      .post("/search")
      .send({
        searchText: "pa"
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

/*describe("AddItem", function() {
  it("AddItem", function(done) {
    server
      .post("/additem")
      .send({
        name: "Bruschetta",
        description: "Italian Dish",
        section: "Lunch",
        price: "4",
        image: ""
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});

describe("UpdateProfile", function() {
  it("UpdateProfile", function(done) {
    server
      .post("/update-profile")
      .send({
        aboutme: "hi pqr!!! edit ",
        city: "Santa Clara",
        company: null,
        country: "USA",
        email: "pqr@gmail.com",
        gender: null,
        name: "PQR",
        phone: null,
        profileimage: null
      })
      .expect(200)
      .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});*/





/*var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done) {
  chai
    .request("http://127.0.0.1:3001")
    .post("/login")
    .send({ Email: "abc@gmail.com", Password: "abc", Profile: "Buyer" })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});*/
