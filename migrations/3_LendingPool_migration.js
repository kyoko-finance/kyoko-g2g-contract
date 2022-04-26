const KyokoLendingPool = artifacts.require('KyokoLendingPool');
const ReserveLogic = artifacts.require("ReserveLogic");
const ValidationLogic = artifacts.require("ValidationLogic");
const saveData = require('../fsUtil');
const fs = require('fs');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const configStr = fs.readFileSync('../deploy.json');
const deployConfig = JSON.parse(configStr);

//CreditSystem address
const creditContractAddress = deployConfig.creditSystem;

module.exports = async function (deployer) {

    console.log("deploy ReserveLogic start");
    await deployer.deploy(ReserveLogic);
    console.log("deploy ReserveLogic done");

    console.log("deploy ValidationLogic start");
    await deployer.deploy(ValidationLogic);
    console.log("deploy ValidationLogic done");

    console.log("deploy KyokoLendingPool start");
    await deployer.link(ReserveLogic, KyokoLendingPool);
    await deployer.link(ValidationLogic, KyokoLendingPool);

    await deployProxy(KyokoLendingPool, [creditContractAddress], 
        { deployer, initializer: 'initialize', overwrite: false, unsafeAllow: ["external-library-linking"] });
    console.log("deploy KyokoLendingPool done");

    const reserveLogicAddress = ReserveLogic.address;
    const validationLogicAddress = ValidationLogic.address;
    const kyokoLendingPoolAddress = KyokoLendingPool.address;

    saveData('reserveLogic', reserveLogicAddress);
    saveData('validationLogic', validationLogicAddress);
    saveData('kyokoLendingPool', kyokoLendingPoolAddress);

    console.table({
        reserveLogic: reserveLogicAddress,
        validationLogic: validationLogicAddress,
        kyokoLendingPool: kyokoLendingPoolAddress
    });

    console.log("❤⭕");



};