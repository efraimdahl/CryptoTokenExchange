This is a plain javascript no-server setup to read a set of token balances from any wallet based on etherium.

In order for this to work in your browser your browser must be able to function as an ETH-Node.

Some browser such as Brave support this nativley
For other browsers such as Firefox you have to install an addon for them to work. 

For firefox, the easiest way to access the network is by adding the MetaMask addon. 
Nativley, Metamask will only allow your browser to run as a node on the etherium network. In order to switch
to other networks, i.e polygon, you will have to create a wallet with Metamask, and add the network: https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844


Once you have your browser set up to be a network host

Run a server (I like using the http-server, which you run by running http-server in the root directory)
Then visit index.html in localhost (usually this will be localhost:8080)