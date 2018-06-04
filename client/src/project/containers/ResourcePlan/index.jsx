import React, {Component} from 'react'
import ResourcePlanList from '../../components/ResourcePlanList'
import AddResourcePlan from '../../components/AddResourcePlan'
import { Button } from 'reactstrap';

class ResourcePlan extends Component {
  state = {
    add: false
  }

  addNewResource = () => {
    this.setState({
      add: true
    })
  }

  render = () => {
    const { add } = this.state
    return (
      <div>
        {
          (add) ? <AddResourcePlan /> :
          <div>
          <ResourcePlanList></ResourcePlanList>
          <Button onClick={this.addNewResource.bind(this)} color="primary" size="lg" active>Add New Resource Plan</Button>
          </div>
        }
      </div>
    )
  }

}

export default ResourcePlan
