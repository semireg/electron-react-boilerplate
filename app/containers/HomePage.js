import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as TmpFileActions from '../actions/tmpFile';

function mapStateToProps(state) {
  return {
    tmpFile: state.tmpFile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TmpFileActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
