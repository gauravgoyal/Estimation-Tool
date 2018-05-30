import React, {Component} from 'react';
import { Table } from 'reactstrap';
import {RIEInput} from 'riek';

class ProjectUncertainityFactors extends Component {

  render = () => {
  const {uFactors} = this.props;
    return (
      <Table>
        <thead>
          <tr>
            <th scope="row">#</th>
            <th scope="row">Confidence Factor</th>
            <th scope="row">Factor Points</th>
            <th scope="row">Lower Multiplier</th>
            <th scope="row">Heigher Multiplier</th>
          </tr>
        </thead>
        <tbody>
          {
            uFactors.map((factor, index) => {
              let key = index + 1;
              let unique_key = 4 * key + 1;
              return (
                <tr key={`factor-${key}`}>
                  <th key={unique_key} scope="row">{ key }</th>
                  <td key={unique_key + 1}>
                    <RIEInput
                      value={factor.title}
                      change={this.props.handleChange.bind(this, index, 'title')}
                      propName='title'
                    >
                    </RIEInput>
                  </td>
                  <td key={unique_key + 2}>
                    <RIEInput
                      value={factor.points}
                      change={this.props.handleChange.bind(this, index, 'points')}
                      propName='points'
                    >
                    </RIEInput>
                  </td>
                  <td key={unique_key + 3}>
                    <RIEInput
                        value={factor.lower_multiplier}
                        change={this.props.handleChange.bind(this, index, 'lower_multiplier')}
                        propName='lower_multiplier'
                      >
                    </RIEInput>
                  </td>
                  <td key={unique_key + 4}>
                    <RIEInput
                        value={factor.heigher_multiplier}
                        change={this.props.handleChange.bind(this, index, 'heigher_multiplier')}
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
}

export default ProjectUncertainityFactors;
