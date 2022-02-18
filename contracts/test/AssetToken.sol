// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

// Blending with Governance.
contract AssetToken is ERC20Upgradeable {
    uint8 private _decimals;
    function initialize(string memory _name, string memory _symbol, uint8 decimals_) public initializer {
        __ERC20_init(_name, _symbol);
        _decimals = decimals_;
    }

    function decimals() public view virtual override returns (uint8) {
        // return 6;
        return _decimals;
    }
    
    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}