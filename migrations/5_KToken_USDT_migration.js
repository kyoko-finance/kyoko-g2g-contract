const KToken = artifacts.require("KToken");
const saveData = require('../fsUtil');
const fs = require('fs');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const configStr = fs.readFileSync('../deploy.json');
const deployConfig = JSON.parse(configStr);
// console.log(config);

const poolAddress = deployConfig.kyokoLendingPool;
const treasuryAddress = deployConfig.collector;
const underlyingAsset = deployConfig.assetToken;
const kTokenDecimals = "6";
const kTokenName = "Kyoko interest bearing USDT";
const kTokenSymbol = "kUSDT";
const params = 0x00;



module.exports = async function (deployer, network, accounts) {
  const [account] = accounts;
  console.log('account', account);

  console.log("deploy KToken start");
  // await deployer.deploy(KToken);
  await deployProxy(KToken,
    [poolAddress, treasuryAddress, underlyingAsset, kTokenDecimals, kTokenName, kTokenSymbol, params],
    { deployer, overwrite: false, initializer: 'initialize' });
  console.log("deploy KToken done");
  const kTokenAddress = KToken.address;

  saveData('kToken', kTokenAddress);

  console.table({
    kToken: kTokenAddress
  });

  console.log("❤⭕");
};
