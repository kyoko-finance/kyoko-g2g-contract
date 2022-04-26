const Collector = artifacts.require("Collector");
const {deployProxy} = require('@openzeppelin/truffle-upgrades');

const saveData = require('../fsUtil');
const fs = require('fs');

//COLLECTOR ADMIN
const multiSig = "0x64A4E3270FF3566F338FfF353f7D416010cCD1A1";

module.exports = async function(deployer, network, accounts) {
  const [account] = accounts;
  console.log("deploy Collector start");

  await deployProxy(
    Collector,
    [],
    {
      deployer,
      initializer: 'initialize', 
      overwrite: false
    }
  );

  const collectorAddress = Collector.address;

  const collector = await Collector.deployed();
  const COLLECTOR_ADMIN = await collector.COLLECTOR_ADMIN();
  console.log('COLLECTOR_ADMIN: ', COLLECTOR_ADMIN);
  await collector.grantRole(COLLECTOR_ADMIN, multiSig);

  saveData('collector', collectorAddress);

  console.table({
    collectorAddress: collectorAddress
  });

  console.log("❤⭕");
};
