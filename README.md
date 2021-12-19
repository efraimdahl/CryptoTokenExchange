This is a node.js server and frontend setup to read a set of token balances from any wallet based on etherium, configured for reading Polygon wallet addresses. 
It will retrieve the token balances of the SHI3LD, PEAR, KOGE and SING tokens associated with the entered wallet. 
Then, it will retrieve a quote through 1Inch to determine the exchange value in DAI. The exchange value uses the defaults from the quote API, with the default gas-price, complexity, gas-limit etc. 



In order for this to work in your browser your browser must be able to function as an ETH-Node.

Some browser such as Brave support this nativley.
For other browsers such as Firefox you have to install an addon for them to work. 

For firefox, the easiest way to access the network is by adding the MetaMask addon. 
Nativley, Metamask will only allow your browser to run as a node on the etherium network. In order to switch
to other networks, i.e polygon, you will have to create a wallet with Metamask, and add the network: https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844

To run the code you will nede Node: https://nodejs.org/en/
and npm (this will usually be installed alongside node)

Once you have your browser set up to be a network host

  1) Install the relevant npm modules by running

  `npm install`

  2) Once the modules are downloaded run `node app.js`

This will start a server on port 5000.
Visit localhost:5000 in the configured browser.
