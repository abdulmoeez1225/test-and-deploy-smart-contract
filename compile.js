const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");

const source = fs.readFileSync(inboxPath, "utf8");
// console.log(inboxPath);

module.exports = solc.compile(source).contracts[":Inbox"];
