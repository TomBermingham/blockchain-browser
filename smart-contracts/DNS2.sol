// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title DNS
 * @dev Map URL to contract address
 */
contract DNS {

    // Mapping from address to string
    mapping(string => address) public addresses;
    string[] domains;

    function get(string memory _domain) public view returns (address) {
        return addresses[_domain];
    }

    function set(address _addr, string memory _domain) public {
        // Update the value at this address
        addresses[_domain] = _addr;
        // Add domain to the list
        domains.push(_domain);
    }

    function remove(string memory _domain) public {
        // Reset the value to the default value.
        delete addresses[_domain];
    }

    function list() public view returns (string[] memory) {
        return domains;
    }

    function createSite(string memory _domain, string memory _html) public {
        Website site = new Website(_html, msg.sender);
        addresses[_domain] = address(site);
        domains.push(_domain);
    }

    function getSite(string memory _domain) public view returns (string memory){
        Website site = Website(addresses[_domain]);
        return site.index();
    }

}

/**
 * @title Website
 * @dev Publish a website which can be modified by the owner. Ownership can be transferred.
  */
contract Website {

    string private html;
    address private owner;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
        modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not the owner of this website");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor(string memory _html, address _owner) {
        owner = _owner; // '_owner' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
        html = _html;
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address 
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    /**
     * @dev Return html
     * @return value of 'html'
     */
    function index() public view returns (string memory){
        return html;
    }
}


     
