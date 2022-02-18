const VariableDebtToken = artifacts.require("VariableDebtToken");
const saveData = require('../fsUtil');
const fs = require('fs');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const configStr = fs.readFileSync('../deploy.json');
const deployConfig = JSON.parse(configStr);
// console.log(config);

const poolAddress = deployConfig.kyokoLendingPool;
const underlyingAsset = deployConfig.assetToken;
const debtTokenDecimals = "6";
const debtTokenName = "kyoko variable debt bearing USDT";
const debtTokenSymbol = "variableDebtUSDT";
const params = 0x00;


module.exports = async function (deployer, network, accounts) {
  const [account] = accounts;
  console.log('account', account);

  console.log("deploy VariableDebtToken start");
  // await deployer.deploy(VariableDebtToken);
  await deployProxy(VariableDebtToken,
    [poolAddress, underlyingAsset, debtTokenDecimals, debtTokenName, debtTokenSymbol, params],
    { deployer, from: account, overwrite: true, initializer: 'initialize' });
  console.log("deploy VariableDebtToken done");
  const variableDebtTokenAddress = VariableDebtToken.address;

  saveData('variableDebtToken',variableDebtTokenAddress);

  console.table({
    variableDebtToken: variableDebtTokenAddress
  });

  console.log("❤⭕");
};
