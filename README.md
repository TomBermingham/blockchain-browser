# Blockchain Browser
https://tombermingham.github.io/blockchain-browser/

### An intuitive internet
Imagine the internet as a child would imagine it:
- you create a website on "the internet" instead of finding a specific provider like AWS,
- you make a website by going to the URL you want to have and pressing "create",
- you update a website by viewing source, making a change, then pressing save.
---
And on top of this you have:
- zero recurring hosting costs,
- no need to integrate with authentication or payment services.
---
And as a user:
- you never have to login or remember passwords again, you're logged into every website by default,
- you can pay for anything by clicking a button (and know it's secure).

### Back to the foundations of the web
The World Wide Web started with documents and hyperlinks. You could use a browser to explore. Web3 applications in 2023 look nothing like this. You typically have a standard web application with a client and a server, which happens to contact the blockchain for certain tasks, such as payments.  
We can bring the basics of the original web to the blockchain by serving HTML directly. The browser will send a request to the blockchain-based network (such as Ethereum) and receive HTML in return.  
This completely eliminates the need for an old-style web server.

### How to serve a Web3-page
Ethereum based networks run on smart contracts. These are written in a language called Solidity. The contracts have functions and they run entirely on the network.  
We access the network by sending a POST request to a node.  
So we need to:
1. Take a URL as input
2. Send a POST request to the node
3. Receive HTML in return
4. Display the HTML

### Why we'll need a new browser
This will not work natively in Chrome because URL navigation sends a GET request. So we will build a custom browser.  
Tauri (the Rust equivalent of Electron) is a good choice for this because it's built on Chromium so it's built to render HTML. We just need to add a nav bar at the top, then render the returned HTML below.

### Contract list
Here are the addresses of some sites on the Sepolia network:
- Hello world: 0xee7A60172c138615F4C6ECf6E2A6b24720B4bce0
- Vision: 0xd3AFE02615aEFa7E374437BFbf06E6ba287e8208
- Menu: 0xd7401B6AD1A8C9c5F0b722384753bb5F159e3f5d
- Hypermedia: 0x6e022678b4ced9733aa51e17372f773b32871490
- How it works: 0x4f9594D8fd1416F9f9130D50470F00F9E965b1FD
- Roadmap: 0x90c361c874a92BB7d2B52a13D6EF47095dd7Dbec

### DNS
- 0xf47FcbC691C60190a32e8f64ccD6d64a5eA7621c
- w3.menu.sep
