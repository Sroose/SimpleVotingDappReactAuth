import store from '../../../store'

export function voteForCandidate(candidate) {
  
  console.log("VFC")
  console.log(this)
	
	return function(dispatch) {
    
		console.log('VOTING FOR CANDIDATE: ' + candidate)
    var allowedCandidates = ['Jan', 'Piet', 'Joris', 'Corneel', 'An']
    if(!allowedCandidates.includes(candidate)) {
      alert("The candidate name is invalid. Please checkspellign and case");
      return
    }
    
    //initialise contract instance using ABI
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      let abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
      let VotingContract = web3.eth.contract(abi);
      // Replace this with the contract address you see during deployment:
      let contractInstance = VotingContract.at('0x5e8ed9264802aba16d7cb6c41e8352e79f5a2798');
      
      //get users account
      web3.eth.getAccounts((error, accs) => {        
        // Log errors, if any.
        if (error) {
          console.error('getAccounts ERROR:')
          console.error(error)
          return
        }
        var account = accs[0]
        
        //vote for the candidate!
        contractInstance.voteForCandidate(candidate, {from: account}, function() {
          console.log('vote casted')
          alert('Thanks, your vote is submitted and needs to be confirmed by miners now')
        })
      })
      
    } else {
      console.error('Web3 is not initialized.');
    }

	}
}
