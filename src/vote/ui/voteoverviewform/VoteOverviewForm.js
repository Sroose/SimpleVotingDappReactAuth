import React, { Component } from 'react'
import store from '../../../store'

class VoteOverviewForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      votes_jan: 0, 
      votes_piet: 0, 
      votes_joris: 0, 
      votes_corneel: 0, 
      votes_an: 0
    }
    
    //initialise contract instance using ABI
    let web3 = store.getState().web3.web3Instance
    if (typeof web3 !== 'undefined') {
      let abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
      let VotingContract = web3.eth.contract(abi);
      // Replace this with the contract address you see during deployment:
      this.contractInstance = VotingContract.at('0x5e8ed9264802aba16d7cb6c41e8352e79f5a2798');
    } else {
      console.error('Web3 is not initialized.');
    }
    
    this.refreshVotes = this.refreshVotes.bind(this);
   // this.voteForCandidate = this.voteForCandidate.bind(this);
    
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.name)
    console.log(event.target.value)
  }

  handleVoteSubmit(event) {
    event.preventDefault()

	  console.log("HANDLE SUBMIT")
	  console.log(this.state)

    this.props.onVoteSubmit(this.state.vote)
  }
    
  getVotes(event) {
    console.log("in getVotes")

    var candidates = ['Jan', 'Piet', 'Joris', 'Corneel', 'An']
    var promises = []
    for (var i = 0; i < candidates.length; i++) {
      promises[i] = this.getVotesForName(candidates[i])
    }

    return Promise.all(promises);
  }
  
  getVotesForName(candidate) {
    //wrap callback as promise
    return new Promise((resolve, reject) => {
      console.log("Checking votes for " + candidate)
      this.contractInstance.totalVotesFor.call(candidate, function(error, votes) {
        if (error) {
          console.error(error)
          reject(error)
        }
        console.log(candidate +" has " + votes)
        resolve(votes)
      })
    })
  }
  
  refreshVotes() {
    this.getVotes().then((values) => {
      console.log("All voting values are resolved");
      console.log(values)
      this.setState({votes_jan: values[0].toString(), votes_piet: values[1].toString(), votes_joris: values[2].toString(), votes_corneel: values[3].toString(), votes_an: values[4].toString()});
    });
  }
    
  componentDidMount() {
    this.refreshVotes()
  }

  componentWillUnmount() {
  }

  render() {
    console.log("render")

    return(
      <div>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleVoteSubmit.bind(this)}>
          <fieldset>
            Jan: {this.state.votes_jan} 
            <br/>
            Piet: {this.state.votes_piet} 
            <br/>
            Joris: {this.state.votes_joris} 
            <br/>
            Corneel: {this.state.votes_corneel} 
            <br/>
            An: {this.state.votes_an} 
            <br/>
            <br/>
            <div>Cast your vote:</div>
            <input id="vote" name="vote" type="text" onChange={this.onInputChange.bind(this)} placeholder="enter name to vote for" />
            <br />

            <button type="submit" className="pure-button pure-button-primary">cast vote</button>
          </fieldset>
        </form>
        <button onClick={this.refreshVotes}>Refresh votes from blockchain</button>
      </div>
    )

  }
}

export default VoteOverviewForm
