const AssetToken = artifacts.require("AssetToken");
const saveData = require('../fsUtil');
const fs = require('fs');
// const name = "Tether USD";
// const symbol = "USDT";
// const decimal = "6";
// const name = "USD Coin";
// const symbol = "USDC";
// const decimal = "6";
const name = "Dai Stablecoin";
const symbol = "DAI";
const decimal = "18";

module.exports = async function(deployer, network, accounts) {
  const [account] = accounts;
  console.log('account', account);

  console.log("deploy AssetToken start");
  await deployer.deploy(
    AssetToken,
    {overwrite: true}
  );
  console.log("deploy AssetToken done");
  const assetTokenAddress = AssetToken.address;

  const asset = await AssetToken.deployed();
  await asset.initialize(name, symbol, decimal);

  //first step, clear the previous deploy file
  fs.rmSync('./deploy.json', { force: true }, console.error);
  saveData( 'assetToken', assetTokenAddress );

  console.table({
    assetToken: assetTokenAddress
  });

  console.log("❤⭕");
};
