const Web3 = require('web3');
const fs = require('fs');
const KyokoLendingPool = artifacts.require("KyokoLendingPool");

const configStr = fs.readFileSync('../deploy.json');
const deployConfig = JSON.parse(configStr);
// console.log(config);

//LendingPool Manager
const multiSig = "0x64A4E3270FF3566F338FfF353f7D416010cCD1A1";

const assetTokenAddress = deployConfig.assetToken;
const creditSystemAddress = deployConfig.creditSystem;
const reserveLogicAddress = deployConfig.reserveLogic;
const validationLogicAddress = deployConfig.validationLogic;
const kyokoLendingPoolAddress = deployConfig.kyokoLendingPool;
const collectorAddress = deployConfig.collector;

const kTokenAddress = deployConfig.kToken;
const variableDebtTokenAddress = deployConfig.variableDebtToken;
const interestRateStrategyAddress = deployConfig.USDTReserveInterestRateStrategy;
const reserveDecimals = 6;
const reserveFactor = 1000;

module.exports = async function (deployer, network, accounts) {
    const [account] = accounts;

    //grant the LendingPool manager role to multiSign
    console.log("setting KyokoLendingPool roles start");
    const lendingPool = await KyokoLendingPool.deployed();
    const LENDING_POOL_ADMIN = await lendingPool.LENDING_POOL_ADMIN();
    console.log('LENDING_POOL_ADMIN: ', LENDING_POOL_ADMIN);
    await lendingPool.grantRole(LENDING_POOL_ADMIN, multiSig);
    await lendingPool.grantRole(LENDING_POOL_ADMIN, account);
    console.log("setting KyokoLendingPool roles done");


    //execute KyokoLendingPool.initReserve(USDT)
    await lendingPool.initReserve(assetTokenAddress, kTokenAddress, 
        variableDebtTokenAddress, interestRateStrategyAddress,
        reserveDecimals, reserveFactor);



    console.table({
        assetToken: assetTokenAddress,
        creditSystem: creditSystemAddress,
        reserveLogic: reserveLogicAddress,
        validationLogic: validationLogicAddress,
        kyokoLendingPool: kyokoLendingPoolAddress,
        collector: collectorAddress,
        kToken: kTokenAddress,
        variableDebtToken: variableDebtTokenAddress,
        USDTReserveInterestRateStrategy: interestRateStrategyAddress
    });

    console.log("❤⭕ All deployment tasks are completed.");


};
