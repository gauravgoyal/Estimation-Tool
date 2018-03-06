import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {RIEInput} from 'riek';

class ProjectRates extends Component {

  state = {
    rates: [],
    loading: true
  }

  handleChange = (index, field, newState) => {
    let item = this.state.rates[index];
    item[field] = newState[field];

    // Update rates.
    var formData = new URLSearchParams();
    for (let key in item) {
      formData.append(key, item[key]);
    }
    fetch('/api/rates/update/' + item.rid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result) {
          let rates = this.state.rates;
          rates[index] = item;
          this.setState({
            rates: rates
          })
        }
      }
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.pid != prevProps.pid) {
      fetch('/api/rates/' + this.props.pid)
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
              <th>#</th>
              <th>Category</th>
              <th>Role</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {
              rates.map((rate, index) => {
                let key = index + 1;
                let unique_key = 4 * key + 1;
                return (
                  <tr key={`rate-${key}`}>
                    <td key={unique_key} scope="row">{ key }</td>
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
    return <div>Loading...</div>;
  }
}

export default ProjectRates;
