const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const fs = require("fs");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const { interface, bytecode } = require("../compile");

const INITIAL_STRING = "Hi there!";
//test case 1

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }
// let car;
// beforeEach(async () => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });

//test case 2
let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    assert.ok(inbox.options.address);

    // console.log(inbox);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.ok(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});
