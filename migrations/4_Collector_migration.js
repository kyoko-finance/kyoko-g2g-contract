const Collector = artifacts.require("Collector");
const {deployProxy} = require('@openzeppelin/truffle-upgrades');

const saveData = require('../fsUtil');
const fs = require('fs');

module.exports = async function(deployer, network, accounts) {
  const [account] = accounts;
  console.log("deploy Collector start");

  await deployProxy(
    Collector,
    {
      deployer, 
      initializer: 'initialize', 
      overwrite: true
    }
  );

  const collectorAddress = Collector.address;

  const collector = await Collector.deployed();
  const COLLECTOR_ADMIN = await collector.COLLECTOR_ADMIN();
  console.log('COLLECTOR_ADMIN: ', COLLECTOR_ADMIN);
  await collector.grantRole(COLLECTOR_ADMIN, account);

  saveData('collector', collectorAddress);

  console.table({
    collectorAddress: collectorAddress
  });

  console.log("❤⭕");
};
