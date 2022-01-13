//https://eth-ropsten.alchemyapi.io/v2/dQHojwCcZgRW-dUvv0knrn5vq-EXhCTH
// 0x1a908DFb048905F196552E6b885B2A9361E9cdf6
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/dQHojwCcZgRW-dUvv0knrn5vq-EXhCTH",
      accounts: [
        "106957f624c11f3951cebb5c43194dd12611cd8d4055c2a8035a3c07f26d9935",
      ],
    },
  },
};
