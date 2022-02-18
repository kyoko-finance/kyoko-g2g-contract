const Web3 = require('web3');
const DefaultReserveInterestRateStrategy = artifacts.require("DefaultReserveInterestRateStrategy");
const saveData = require('../fsUtil');

const OPTIMAL_UTILIZATION_RATE = Web3.utils.toWei("900000000", "ether");
const BASE_VARIABLE_BORROW_RATE = 0;
const VARIABLE_RATE_SLOPE1 = Web3.utils.toWei("40000000", "ether");
const VARIABLE_RATE_SLOPE2 = Web3.utils.toWei("600000000", "ether");

module.exports = async function(deployer, network, accounts) {
  const [account] = accounts;
  console.log("deploy USDT DefaultReserveInterestRateStrategy start");
  await deployer.deploy(
    DefaultReserveInterestRateStrategy,
    OPTIMAL_UTILIZATION_RATE,
    BASE_VARIABLE_BORROW_RATE,
    VARIABLE_RATE_SLOPE1,
    VARIABLE_RATE_SLOPE2,
    { from: account, overwrite: true }
  );
  console.log("deploy USDT DefaultReserveInterestRateStrategy done");

  const interestRateStrategyAddress = DefaultReserveInterestRateStrategy.address;

  saveData('USDTReserveInterestRateStrategy', interestRateStrategyAddress);

  console.table({
      USDTReserveInterestRateStrategy: interestRateStrategyAddress
  });

  console.log("❤⭕");
};
