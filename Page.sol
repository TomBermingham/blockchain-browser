// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Page
 * @dev Store & retrieve value in a variable
 */
contract Page {

    string text = '<article> <header> <h3>Vision</h3> Truly decentralised applications. </header> <h5>Decentralised applications (DApps) in 2023</h5> <p>DApps typically have three parts:</p><ul> <li>the frontend, which provides the user interface,</li><li>the server delivering the frontend, hosted on a cloud provider such as AWS,</li><li>and smart contract(s) storing application data and/or logic.</li></ul> <h5>The problem</h5> <p>These apps are not truly decentralised. They still require a server. In other words, they are Web2 apps which happen to contact the blockchain.</p><h5>The solution</h5> <p>A truly decentralised application would be delivered directly from the blockchain to the client.</p><p>These apps will be permanently available without the need for a server.</p><p>This can be achieved by serving HTML directly from a smart contract. This requires the browser to contact the smart contract directly, and expect HTML as a response.</p><p>Browsers cannot do this currently, so we will have to find workarounds. But an ideal future is one where all browsers support fetching HTML directly from the blockchain.</p><footer> <cite>This page is delivered by an Ethereum smart contract.</cite> </footer> </article>';

    /**
     * @dev Return value 
     * @return value of 'text'
     */
    function retrieve() public view returns (string memory){
        return text;
    }
}
