import React, { Component } from 'react'
import VoteOverviewFormContainer from '../../ui/voteoverviewform/VoteOverviewFormContainer'

class VoteOverview extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Vote</h1>
            <p>Overview of current votes</p>
            <VoteOverviewFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default VoteOverview
