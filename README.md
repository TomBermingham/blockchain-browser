# Blockchain Browser
https://blockchain-browser.vercel.app

### A more intuitive internet
Imagine the internet as a child would imagine it:
- you create a website on "the internet" instead of finding a specific provider like AWS,
- you make a website by going to the URL you want to have and pressing "create",
- you update a website by viewing source, making a change, then pressing save.
  
And on top of this you have:
- zero recurring hosting costs,
- no need to integrate with authentication or payment services.
  
And as a user:
- you never have to login or remember passwords again, you're logged into every website by default,
- you can pay for anything by clicking a button (and know it's secure).

### Back to the foundations of the web
The World Wide Web started with documents and hyperlinks. You could use a browser to navigate. Web3 applications in 2023 look nothing like this. You typically have a Web2 style client and server, with a bit of blockchain-based functionality bolted on. The decentralised aspect is reserved for certain tasks, such as payments.  
We can bring the basics of the original web to the blockchain by serving HTML directly. The browser will send a request to the blockchain-based network (such as Ethereum) and receive HTML in return.  
This completely eliminates the need for a Web2 style web server.

### How to serve a Web3-page
Ethereum based networks run on smart contracts. These are written in a language called Solidity. The contracts have functions and they run entirely on the network.  
We access the network by sending a POST request to a node.  
So we need to:
1. Take a URL as input
2. Send a POST request to the node
3. Receive HTML in return
4. Display the HTML

### Why we'll need a new browser
This will not work natively in Chrome because URL navigation sends a GET request. So we will build a custom browser. We just need to add a nav bar at the top, then render the returned HTML below. The easiest way to achieve this is within an existing web browser. Check it out here: https://blockchain-browser.vercel.app  
When you press "see websites" it takes you to a page delivered by a smart contract.

### Inspiration
This project was insprired by [Hypermedia Systems ](https://hypermedia.systems/). The book describes some of the foundational ideas that power the web, including the concept of Hypermedia. I realised after reading this that hypermedia is missing from Web3 applications. The aim of this project is to create a hypermedia client (web browser) so Web3 applications become as simple to build and use as any other web application, or even simpler.
