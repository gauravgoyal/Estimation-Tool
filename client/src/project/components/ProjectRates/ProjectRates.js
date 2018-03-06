import React, {Component} from 'react';
import { Table } from 'reactstrap';

class ProjectRates extends Component {

  state = {
    rates: [],
    loading: true
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
                    <td key={unique_key + 1}>{ rate.category }</td>
                    <td key={unique_key + 2}>{ rate.role }</td>
                    <td key={unique_key + 3}>${ rate.rate }</td>
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
