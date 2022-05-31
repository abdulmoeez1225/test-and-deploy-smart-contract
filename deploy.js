const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const mnemonicPhrase =
  "buzz dilemma guard bike style duty alley raven skirt audit bounce bubble"; // 12 word mnemonic
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/08e79ba043fc4490bceea19eb741fd60",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy an account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deploy to", result.options.address);
};

deploy();
