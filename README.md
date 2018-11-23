Simple voting dapp
=======

A simple voting app on Ethereum based on 
- [this hello-world tutorial](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)
- [Truffle react-auth box](http://truffleframework.com/boxes/react-auth)

To try it out:
- install npm modules
```
npm install
```
- update truffle.js to match your Ethereum node or run Ganache on port 7545
- install the Metamask browser plugin for easy web3 interaction
- compile code and and deploy contracts:
```
truffle migrate
```
- write down the contract address and update the files VoteOverviewForm.js and VoteOverviewFormActions.js
```
npm run start
```