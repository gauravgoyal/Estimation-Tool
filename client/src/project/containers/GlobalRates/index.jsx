/**
 * @file
 */

import React, {Component} from 'react'
import { connect } from 'react-redux'
import GlobalRates from '../../components/GlobalRates';
import { updateGlobalProjectRates, addGlobalProjectRate, fetchGlobalRates } from '../../actions'

class GlobalRate extends Component {

  state = {
    role: '',
    rate: '',
  };

  componentDidMount = () => {
    const {dispatch} = this.props
    dispatch(fetchGlobalRates());
  }
  updateRates = (index, field, newState) => {
    const {globalRates, dispatch} = this.props
    let item = globalRates[index];
    item[field] = newState[field];
    globalRates[index] = item;
    dispatch(updateGlobalProjectRates(item, globalRates))
  }

  onSubmitForm = () => {
    let rate = this.state;
    const {globalRates, dispatch} = this.props
    globalRates.push(rate);
    dispatch(addGlobalProjectRate(rate, globalRates))
  }

  updateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {};
      data[field] = e.target.value;
      this.setState(data);
    }
  }

  render() {
    const { isFetching, globalRates } = this.props
    return (
      <div className = "animated fadeIn">
        {
          (isFetching) ?
          <div className = "m-3 p-3"> <h3> No rates!  Added Yet</h3></div>
          :
          <GlobalRates
            rates = {globalRates}
            handleChange = {this.updateRates.bind(this)}
            submitForm = {this.onSubmitForm.bind(this)}
            onUpdate = {this.updateValue.bind(this)}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, globalRates } = state.projectRates
  return {
    isFetching,
    globalRates
  }
}

export default connect(mapStateToProps)(GlobalRate)
