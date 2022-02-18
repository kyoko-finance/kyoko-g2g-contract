const { admin } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer, network) {
  // Gnosis Safe
  const gnosisSafe = '0x0000000000000000000000000000000000000000';
 
  // Don't change ProxyAdmin ownership for our test network
//   if (network !== 'test') {
//     // The owner of the ProxyAdmin can upgrade our contracts
    
//   }

  // await admin.transferProxyAdminOwnership(gnosisSafe);
};