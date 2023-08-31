// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title DNS
 * @dev Map URL to contract address
 */
contract DNS {

    // Mapping from address to string
    mapping(string => address) public sites;

    function get(string memory _domain) public view returns (address) {
        return sites[_domain];
    }

    function set(address _addr, string memory _domain) public {
        // Update the value at this address
        sites[_domain] = _addr;
    }

    function remove(string memory _domain) public {
        // Reset the value to the default value.
        delete sites[_domain];
    }

}
