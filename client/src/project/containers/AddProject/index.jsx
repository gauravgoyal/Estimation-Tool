import React, {Component} from 'react'
import {connect} from 'react-redux'
import NewProject from "../../components/NewProject/"
import {addProject} from '../../actions'
import defaultRates from './_initialRate.js';
import defaultFactors from './_initialUFactors.js';
import {Redirect} from 'react-router'

class AddProject extends Component {
  state = {}

  onUpdateValue = (field, e) => {
    if (e.target.value !== '') {
      var data = {}
      data[field] = e.target.value
      this.setState(data)
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {dispatch} = this.props
    let project = this.state;
    let rates = [];
    defaultRates.rates.map((defaultRate) => {
      let tempRate = {}
      tempRate.role = defaultRate.role;
      tempRate.resource_type = (defaultRate.resource_type) ? defaultRate.resource_type : 0;
      tempRate.role_type = (defaultRate.role_type) ? defaultRate.role_type : 0;
      defaultRate.rate.map((rate) => {
        if (rate.currency === this.state.currency) {
          tempRate.rate = rate.standard_rate;
          tempRate.cost = rate.cost;
        }
        return tempRate;
      })
      rates.push(tempRate);
      return rates;
    })
    let uFactors = defaultFactors.ufactors
    dispatch(addProject(project, rates, uFactors));
  }

  render = () => {
    const {isFetching} = this.props
    if (isFetching) {
      return (
        <Redirect to="/dashboard"/>
      )
    }
    else {
      return (
        <NewProject
          onSubmitForm={this.submitForm.bind(this)}
          updateValue={this.onUpdateValue.bind(this)}
        />
      )
    }
  }
}

const mapStateToProps = (state) => {
  const {isFetching} = state.projectOperations
  return {
    isFetching
  }
}

export default connect(mapStateToProps)(AddProject);
