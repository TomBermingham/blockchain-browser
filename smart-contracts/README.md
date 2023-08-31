# Smart contracts

### Page.sol
This is the most basic example of a blockchain web server. It delivers one HTML page to the client. The HTML content is hardcoded in the string, so the page cannot be modified after deployment.

### Website.sol
This is an upgraded version of page.sol.
- The HTML content is provided in the constructor, so the same contract can be used for many pages.
- You can modify the content of the page by providing new HTML. (Costs gas)
- You can pass ownership onto someone else. (Costs gas)

### DNS.sol
This maps domains with contract addresses.  
"w3.example.sep" -> "dfjksdfsdfdskhknkjsfhakdfhhjf"  
There is no established naming convention for domains. But it makes sense to indicate which network the site is on. The ".sep" indicates the Sepolia test network.