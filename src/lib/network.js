import Web3 from 'web3';
import { WEBSITE_BYTECODE, WEBSITE_ABI, DNS_ABI } from './contracts.js';

const supportedNetworks = [
    {
        code: 'zkevm',
        name: 'zkEVM Testnet (Recommended)',
        dns: '0x013017EDC40273aa2F42cB2Bd4e879475127687B',
        nodeUrl: 'https://polygonzkevm-testnet.g.alchemy.com/v2/VgdbxYZl3H_oa7MCwEKd_piXPm3opgJe'
    },
    {
        code: 'moon',
        name: 'Moonbase Alpha',
        dns: '0xee7A60172c138615F4C6ECf6E2A6b24720B4bce0',
        nodeUrl: 'https://rpc.api.moonbase.moonbeam.network'
    },
    {
        code: 'eth',
        name: 'Sepolia Testnet',
        dns: '0x9504f11C4409a82A95F306E762e4d6a69360308d',
        nodeUrl: 'https://eth-sepolia.g.alchemy.com/v2/m41vG11L6gyJJ5QkkqcU5UuG_FfCpWVc'
    },
]

//ETH DNS2 0x7DF890c9D449707c8139e802f1299310e62d6448
//ETH DNS3 0x9504f11C4409a82A95F306E762e4d6a69360308d

//zkEVM DNS2 0xee7A60172c138615F4C6ECf6E2A6b24720B4bce0
//zkEVM DNS3 0x013017EDC40273aa2F42cB2Bd4e879475127687B

const getNetwork = (code) => supportedNetworks.find(n => n.code === code);
const defaultNetworkCode = 'moon';

const lookupDomain = async (domain) => {
    const networkCode = domain.split('.').at(-1);
    const network = getNetwork(networkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const res = await makeUnsignedCall(provider, 'get', network.dns, DNS_ABI, [domain]);
    return res;
}

const lookupSite = async (domain) => {
    const networkCode = domain.split('.').at(-1);
    const network = getNetwork(networkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const res = await makeUnsignedCall(provider, 'getSite', network.dns, DNS_ABI, [domain]);
    return res;
}

const createSite = async (domain, html) => {
    console.log('Create site: ' + domain);
    const networkCode = domain.split('.').at(-1);
    const network = getNetwork(networkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const web3 = new Web3(provider);

    const transactionHash = await makeSignedCall(provider, 'createSite', network.dns, DNS_ABI, [domain, html]);
    console.log(transactionHash);

    let receipt = null;
    while(receipt === null) {
        try {
            receipt = await web3.eth.getTransactionReceipt(transactionHash);
            if(receipt){
                const newWebsiteAddress = "./?address=" + domain;
                window.location.href = newWebsiteAddress;
                return receipt;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch(error) {
            console.log(error);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return true;
}

const updateSite = async (domain, html) => {
    console.log('Update site: ' + domain);
    const networkCode = domain.split('.').at(-1);
    const network = getNetwork(networkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const web3 = new Web3(provider);

    const transactionHash = await makeSignedCall(provider, 'updateSite', network.dns, DNS_ABI, [domain, html]);
    console.log(transactionHash);

    let receipt = null;
    while(receipt === null) {
        try {
            receipt = await web3.eth.getTransactionReceipt(transactionHash);
            if(receipt){
                const newWebsiteAddress = "./?address=" + domain;
                window.location.href = newWebsiteAddress;
                return receipt;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch(error) {
            console.log(error);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return true;
}

const list = async (networkCode) => {
    const network = getNetwork(networkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const res = await makeUnsignedCall(provider, 'list', network.dns, DNS_ABI, []);
    return res;
}

const getHTML = async (address) => {
    const network = getNetwork(defaultNetworkCode);
    const provider = new Web3.providers.HttpProvider(network.nodeUrl);
    const res = await makeUnsignedCall('retrieve', address, abiWebsite, []);
    return res;
}

async function makeUnsignedCall(provider, method, address, abi, parameters) {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address);
    const tx = contract.methods[method](...parameters);
    const res = await tx.call({ from: null });
    return res;
}

async function makeSignedCall(provider, method, address, abi, parameters) {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address);
    const tx = contract.methods[method](...parameters);

    const receipt = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: window.ethereum.selectedAddress,
                    to: address,
                    data: tx.encodeABI(),
                },
            ],
        });

    return receipt;
}

export let network = {
    lookupDomain,
    lookupSite,
    createSite,
    updateSite,
    list,
    getHTML,
    supportedNetworks
}