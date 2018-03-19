import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {RIEInput} from 'riek';

class ProjectUncertainityFactors extends Component {

  state = {
    factors: [],
    loading: true,
    pid: '',
    refresh: false,
  }

  handleChange = (index, field, newState) => {
    let item = this.state.factors[index];
    item[field] = newState[field];

    // Update factors.
    var formData = new URLSearchParams();
    for (let key in item) {
      formData.append(key, item[key]);
    }
    fetch('/api/factors/update/' + item.ufid, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData
    })
    .then(res => res.json())
    .then(
      (result) => {
        if (result.status == 200) {
          let factors = this.state.factors;
          factors[index] = item;
          this.setState({
            factors: factors
          })
        }
      }
    )
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.pid != this.props.pid) {
      this.setState({
        pid: nextProps.pid
      })
    }

    if (nextProps.refresh != this.props.refresh) {
      this.setState({
        refresh: nextProps.refresh
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if ((prevState.pid != this.state.pid) || (prevState.refresh !== this.state.refresh)) {
      fetch('/api/factors/' + this.state.pid)
      .then(res => res.json())
      .then(factors => this.setState({
        factors: factors,
        loading: false
      }));
    }
  }

  render = () => {
    const {factors, loading} = this.state;
    if (!loading) {
      return (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Confidence Factor</th>
              <th>Factor Points</th>
              <th>Lower Multiplier</th>
              <th>Heigher Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {
              factors.map((factor, index) => {
                let key = index + 1;
                let unique_key = 4 * key + 1;
                return (
                  <tr key={`factor-${key}`}>
                    <td key={unique_key} scope="row">{ key }</td>
                    <td key={unique_key + 1}>
                      <RIEInput
                        value={factor.title}
                        change={this.handleChange.bind(this, index, 'title')}
                        propName='title'
                      >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 2}>
                      <RIEInput
                        value={factor.points}
                        change={this.handleChange.bind(this, index, 'points')}
                        propName='points'
                      >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 3}>
                      <RIEInput
                          value={factor.lower_multiplier}
                          change={this.handleChange.bind(this, index, 'lower_multiplier')}
                          propName='lower_multiplier'
                        >
                      </RIEInput>
                    </td>
                    <td key={unique_key + 4}>
                      <RIEInput
                          value={factor.heigher_multiplier}
                          change={this.handleChange.bind(this, index, 'heigher_multiplier')}
                          propName='heigher_multiplier'
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
    return <div className="m-3 p-3"><h3>Please select a project to view factors!</h3></div>;
  }
}

export default ProjectUncertainityFactors;
