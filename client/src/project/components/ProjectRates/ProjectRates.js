import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {RIEInput} from 'riek';
import config from '../../../config';

class ProjectRates extends Component {

  state = {
    rates: [],
    loading: true,
    pid: '',
    refresh: false,
  }

  handleChange = (index, field, newState) => {
    let item = this.state.rates[index];
    item[field] = newState[field];

    // Update rates.
    var formData = new URLSearchParams();
    for (let key in item) {
      formData.append(key, item[key]);
    }
    fetch(config.api_url + 'rates/update/' + item.rid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.status === 200) {
          let rates = this.state.rates;
          rates[index] = item;
          this.setState({
            rates: rates
          })
        }
      }
    )
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid !== this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }

    if (nextProps.refresh !== this.props.refresh) {
      this.setState({
        refresh: nextProps.refresh
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevState.pid !== this.state.pid) || (prevState.refresh !== this.state.refresh)) {
      fetch(config.api_url + 'rates/' + this.state.pid)
      .then(res => res.json())
      .then(rates => this.setState({
        rates: rates,
        loading: false
      }));
    }
  }

  render = () => {
    const {rates, loading} = this.state;
    if (!loading) {
      return (
        <Table>
          <thead>
            <tr>
              <th scope="row">#</th>
              <th scope="row">Code</th>
              <th scope="row">Category</th>
              <th scope="row">Role</th>
              <th scope="row">Rate</th>
            </tr>
          </thead>
          <tbody>
            {
              rates.map((rate, index) => {
                let key = index + 1;
                let unique_key = 4 * key + 1;
                return (
                  <tr key={`rate-${key}`}>
                    <th key={unique_key} scope="row">{ key }</th>
                    <td key={unique_key + 4}>
                      <RIEInput
                        value={rate.code}
                        change={this.handleChange.bind(this, index, 'code')}
                        propName='code'
                      >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 1}>
                      <RIEInput
                        value={rate.category}
                        change={this.handleChange.bind(this, index, 'category')}
                        propName='category'
                      >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 2}>
                      <RIEInput
                        value={rate.role}
                        change={this.handleChange.bind(this, index, 'role')}
                        propName='role'
                      >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 3}>$
                      <RIEInput
                          value={rate.rate}
                          change={this.handleChange.bind(this, index, 'rate')}
                          propName='rate'
                        >
                      </RIEInput>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      );
    }
    return <div className="m-3 p-3"><h3>Please select a project to view rates!</h3></div>;
  }
}

export default ProjectRates;
