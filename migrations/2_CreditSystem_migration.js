const CreditSystem = artifacts.require("CreditSystem");
const saveData = require('../fsUtil');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

//CreditSystem Manager
const multiSig = "0x64A4E3270FF3566F338FfF353f7D416010cCD1A1";

module.exports = async function (deployer, network, accounts) {
  const [account] = accounts;
  console.log('account', account);

  console.log("deploy CreditSystem start");
  // await deployer.deploy(CreditSystem,
    // { from: account, overwrite: true });

  await deployProxy(CreditSystem, [],
    { deployer, initializer: 'initialize', overwrite: false });

  console.log("deploy CreditSystem done");



  //grant the manager role to multiSign
  console.log("setting credit System roles start");
  const creditSystem = await CreditSystem.deployed();
  const DEFAULT_ADMIN_ROLE = await creditSystem.DEFAULT_ADMIN_ROLE();
  await creditSystem.grantRole(DEFAULT_ADMIN_ROLE, multiSig);
  const ROLE_CREDIT_MANAGER = await creditSystem.ROLE_CREDIT_MANAGER();
  console.log('ROLE_CREDIT_MANAGER: ', ROLE_CREDIT_MANAGER);
  // await creditSystem.grantRole(ROLE_CREDIT_MANAGER, account);
  await creditSystem.grantRole(ROLE_CREDIT_MANAGER, multiSig);
  console.log("setting credit System roles done");

  const creditSystemAddress = CreditSystem.address;

  saveData('creditSystem', creditSystemAddress);

  console.table({
    creditSystem: creditSystemAddress
  });

  console.log("❤⭕");
};
