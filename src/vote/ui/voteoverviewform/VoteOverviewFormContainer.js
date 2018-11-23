import { connect } from 'react-redux'
import VoteOverviewForm from './VoteOverviewForm'
import { voteForCandidate } from './VoteOverviewFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    tokens: state.tokens
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVoteSubmit: (candidate) => {
      event.preventDefault();

      dispatch(voteForCandidate(candidate))
    }
  }
}

const VoteOverviewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteOverviewForm)

export default VoteOverviewFormContainer
