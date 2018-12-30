import React, {Component} from 'react'
import ResourcePlanList from '../../components/ResourcePlanList'
import AddResourcePlan from '../../components/AddResourcePlan'
import { Button } from 'reactstrap';
import { weeks } from './_defaultWeeks.js';
import { resourceAllocations } from './_defaultAllocations.js'
import { connect } from 'react-redux'
import {
  createProjectPlan,
  updateProjectPlan,
  fetchProjectResourcePlans,
  fetchProjectResourceAllocations,
  updateProjectResourceAllocations,
  addProjectResourceAllocation
} from '../../actions'

class ResourcePlan extends Component {
  state = {
    add: false,
    discount: 0,
    showWeeks: false,
  }

  submitResourceForm = (weeks) => {
    const { dispatch, projectRates, isFetching} = this.props
    let rates = [];
    if (!isFetching) {
      projectRates.forEach((rate) => {
        rates[rate.role] = rate.rid;
      })
      const rows = []
      resourceAllocations.forEach((data, index) => {
        let tempRow = {}
        tempRow.role = data.role
        tempRow.rid = rates[data.role]
        data.allocations.forEach((hours, index) => {
          let weekName = hours.week_name + " - (W" + hours.week + ")"
          tempRow[weekName] = hours.hours
          tempRow.weekNumber = hours.week
        })
        tempRow.id = index + 1
        rows.push(tempRow)
      })
      dispatch(createProjectPlan(rows, weeks))
    }
  }

  addNewResource = () => {
    this.setState({
      add: true
    })
  }

  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(fetchProjectResourcePlans())
  }

  onAfterInsertRow = (row) => {
    const {dispatch, currResId} = this.props
    dispatch(addProjectResourceAllocation(row, currResId));
  }

  onAfterSaveCell = (row, cellName, cellValue) => {
    const { dispatch } = this.props
    let matches = cellName.match(/\(W(\d+)\)/)
    let week = matches[1]
    let data = {
      resId: row.resId,
      rid: row.rid,
      weekName: cellName,
      hours: cellValue,
      week: week
    }
    dispatch(updateProjectResourceAllocations(data))
  }

  showSelectedResourcePlan = (plan, e) => {
    const { dispatch } = this.props
    dispatch(fetchProjectResourceAllocations(plan.res_id, plan))
    this.setState({
      add: true
    })
  }

  addMoreWeeks = (value) => {
    const { dispatch, currPlan, currResId, currProject} = this.props
    currPlan.weeks = currPlan.weeks + parseInt(value)
    currPlan.pid = currProject.pid
    currPlan.resId = currResId
    dispatch(updateProjectPlan(currPlan, currResId))
  }

  calculateRevenue = (currPlan, discount) => {
    const { projectRates } = this.props
    let rows = []
    let ratesData = []
    projectRates.forEach((rates) => {
      let cost = parseInt(rates.cost, 10)
      let listedRate = parseInt(rates.rate, 10)
      let calculatedDiscount = (listedRate * discount) / 100;
      let sellRate = listedRate - Math.floor(calculatedDiscount);
      ratesData[rates.role] = {
        cost: cost,
        listedRate: listedRate,
        sellRate: sellRate,
        resource_type: rates.resource_type,
        role_type: rates.role_type
      }
    })
    currPlan.forEach((allocation) => {
      let temp = {}
      temp.role = allocation.role
      temp.hours = 0;
      Object.keys(allocation).forEach((key) => {
        let matches = key.match(/\(W(\d+)\)/)
        if (matches !== null && matches.length > 0) {
          allocation[key] = (allocation[key] !== '') ? allocation[key] : 0
          temp.hours += parseInt(allocation[key], 10)
        }
      })
      temp.totalCost = temp.hours * ratesData[temp.role].cost
      temp.listRev = temp.hours * ratesData[temp.role].listedRate
      temp.totalRev = temp.hours * ratesData[temp.role].sellRate
      temp.cost = ratesData[temp.role].cost
      temp.listedRate = ratesData[temp.role].listedRate
      temp.sellRate = ratesData[temp.role].sellRate
      temp.resource_type = ratesData[temp.role].resource_type
      temp.role_type = ratesData[temp.role].role_type
      rows.push(temp)
    })
    return rows
  }

  calculateTotal = (revenueTotal) => {
    let total = {
      hours: 0,
      cost: 0,
      revenue: 0,
      actual: 0,
      blendedMargin: 0,
    }
    let partners = {
      hours: 0,
      cost: 0,
      revenue: 0,
      actual: 0,
      blendedMargin: 0,
    }
    let acquia = {
      hours: 0,
      cost: 0,
      revenue: 0,
      actual: 0,
      blendedMargin: 0,
    }
    revenueTotal.forEach((revenue) => {
      if (revenue.resource_type === 'Acquia') {
        acquia.hours += parseInt(revenue.hours, 10)
        acquia.cost += parseInt(revenue.totalCost, 10)
        acquia.revenue += parseInt(revenue.listRev, 10)
        acquia.actual += parseInt(revenue.totalRev, 10)
        acquia.blendedMargin = Math.round(((total.actual - total.revenue) / total.revenue) * 100) / 100 + '%';
      }
      else {
        partners.hours += parseInt(revenue.hours, 10)
        partners.cost += parseInt(revenue.totalCost, 10)
        partners.revenue += parseInt(revenue.listRev, 10)
        partners.actual += parseInt(revenue.totalRev, 10)
        partners.blendedMargin = Math.round(((total.actual - total.revenue) / total.revenue) * 100) / 100 + '%';
      }
      total.hours += parseInt(revenue.hours, 10)
      total.cost += parseInt(revenue.totalCost, 10)
      total.revenue += parseInt(revenue.listRev, 10)
      total.actual += parseInt(revenue.totalRev, 10)
      total.blendedMargin = Math.round(((total.actual - total.revenue) / total.revenue) * 100) / 100 + '%';
    })

    let rev = ((total.revenue - total.cost) / total.revenue) * 100
    let listRev = ((total.actual - total.cost) / total.revenue) * 100

    // Acquia Margin
    let acqRev = ((acquia.revenue - acquia.cost) / acquia.revenue) * 100
    let acqListRev = ((acquia.actual - acquia.cost) / acquia.revenue) * 100

    // Partner Margin
    let partnerRev = ((partners.revenue - partners.cost) / partners.revenue) * 100
    let partnerListRev = ((partners.actual - partners.cost) / partners.revenue) * 100

    rev = (Math.round(rev * 100) / 100);
    listRev = (Math.round(listRev * 100) / 100);

    acqRev = (Math.round(acqRev * 100) / 100);
    acqListRev = (Math.round(acqListRev * 100) / 100);

    partnerRev = (Math.round(partnerRev * 100) / 100);
    partnerListRev = (Math.round(partnerListRev * 100) / 100);
    

    let rows = [
      // Partner resources calculation
      {
        title: "Partner Hours",
        listRates: partners.hours,
        actuals: partners.hours,
        diffList: 0
      },
      {
        title: "Partner Cost",
        listRates: partners.cost,
        actuals: partners.cost,
        diffList: 0
      },
      {
        title: "Partner Revenue",
        listRates: partners.revenue,
        actuals: partners.actual,
        diffList: partners.actual - partners.revenue
      },
      {
        title: "Partner Margin",
        listRates: partnerRev + "%",
        actuals: partnerListRev + "%",
        diffList: Math.round((partnerListRev - partnerRev) * 100) / 100 + "%"
      },
      // Acquia Resource Hours
      {
        title: "Acquia Hours (billable)",
        listRates: acquia.hours,
        actuals: acquia.hours,
        diffList: 0
      },
      {
        title: "Acquia Cost (not incl. travel)",
        listRates: acquia.cost,
        actuals: acquia.cost,
        diffList: 0
      },
      {
        title: "Acquia Revenue",
        listRates: acquia.revenue,
        actuals: acquia.actual,
        diffList: acquia.actual - acquia.revenue
      },
      {
        title: "Acquia Margin",
        listRates: acqRev + "%",
        actuals: acqListRev + "%",
        diffList: Math.round((acqListRev - acqRev) * 100) / 100 + "%"
      },
      {
        title: "Total Hours",
        listRates: total.hours,
        actuals: total.hours,
        diffList: 0
      },
      {
        title: "Total Cost",
        listRates: total.cost,
        actuals: total.cost,
        diffList: 0
      },
      {
        title: "Total Revenue",
        listRates: total.revenue,
        actuals: total.actual,
        diffList: total.revenue - total.actual,
      },
      {
        title: "Blended Margin",
        listRates: rev + "%",
        actuals: listRev + "%",
        diffList: Math.round((listRev - rev) * 100) / 100 + "%"
      },
      {
        title: "% Acquia Revenue",
        listRates: Math.round((acquia.revenue/total.revenue) * 100) + "%",
        actuals: Math.round((acquia.actual/total.actual) * 100) + "%",
        diffList: Math.round((acquia.revenue/total.revenue) * 100) - Math.round((acquia.actual/total.actual) * 100) + "%"
      },
      {
        title: "% Partner Revenue",
        listRates: Math.round((partners.revenue/total.revenue) * 100) + "%",
        actuals: Math.round((partners.actual/total.actual) * 100) + "%",
        diffList: Math.round((partners.revenue/total.revenue) * 100) - Math.round((partners.actual/total.actual) * 100) + "%"
      }
    ];
    return rows
  }

  onDiscountChange = (e) => {
    let val = e.target.value;
    this.setState({
      discount: val
    })
  }

  syncEstimates = (revenueTotal) => {
    const { projectTasks, projectRates } = this.props
    let rows = [];
    let beHours = 0;
    let feHours = 0;

    let ratesData = []
    projectRates.forEach((rates) => {
      ratesData[rates.rid] = {
        role_type: rates.role_type
      }
    })

    let tempBEHoursLow = 0
    let tempBEHoursHigh = 0
    let tempFEHoursLow = 0
    let tempFEHoursHigh = 0
    projectTasks.forEach((task) => {
      if (ratesData[task.rid].role_type == 'Backend') {
        tempBEHoursLow += parseInt(task.hours_low)
        tempBEHoursHigh += parseInt(task.hours_high)
      }
      else if (ratesData[task.rid].role_type == 'Frontend') {
        tempFEHoursLow += parseInt(task.hours_low)
        tempFEHoursHigh += parseInt(task.hours_high)
      }
    })

    revenueTotal.forEach((revenue) => {
      if (revenue.role_type === 'Backend') {
        beHours += parseInt(revenue.hours, 10)
      }
      else if (revenue.role_type === 'Frontend') {
        feHours += parseInt(revenue.hours, 10)
      }
    })

    rows = [
      {
        title: "Fronend Developer",
        lowHours: tempFEHoursLow,
        highHours: tempFEHoursHigh,
        estimate: feHours
      },
      {
        title: "Backend Developer",
        lowHours: tempBEHoursLow,
        highHours: tempBEHoursHigh,
        estimate: beHours
      },
      {
        title: "Total Dev",
        lowHours: tempFEHoursLow + tempBEHoursLow,
        highHours: tempFEHoursHigh + tempBEHoursHigh,
        estimate: feHours + beHours
      }
    ]
    return rows;
  }


  render = () => {
    const { add, discount, showWeeks } = this.state
    const { projectRates, resourcePlans, currPlan } = this.props
    const rateOptions = []

    projectRates.forEach((rate) => {
      rateOptions[rate.rid] = rate.role
    })

    let revenue = this.calculateRevenue(currPlan, discount)
    let revenueTotal = this.calculateTotal(revenue)
    let syncData = this.syncEstimates(revenue)

    const column = [{
      Header: 'Role',
      accessor: "role"
    }]
    const rows = currPlan

    rows.forEach((data) => {
      data.unique_id = Math.floor(Date.now())
    })

    weeks.forEach((data) => {
      let temp = {
        Header: data.week_name + " - (W" + data.week + ")",
        accessor: data.week_name + " - (W" + data.week + ")",
        weekNumber: data.week
      }
      column.push(temp)
    })

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    };

    const options = {
      afterInsertRow: this.onAfterInsertRow,
    }

    const noOfWeeks = currPlan.weeks;

    return (
      <div>
        {
          (add) ?
          <AddResourcePlan
            options = {options}
            rateOptions = { rateOptions }
            cellEditProp = { cellEditProp }
            rates={projectRates}
            header={column}
            rows={rows}
            revenue = { revenue }
            noOfWeeks = { noOfWeeks }
            totalRevenue = { revenueTotal }
            onSubmitForm = { this.submitResourceForm.bind(this) }
            onDiscount = { this.onDiscountChange.bind(this) }
            syncData = { syncData }
            onAddWeek = { this.addMoreWeeks.bind(this) }
            showWeeksInput = { showWeeks }
          />
          :
          <div>
            <ResourcePlanList
              onClick= {this.showSelectedResourcePlan.bind(this)}
              plans={resourcePlans}>
            </ResourcePlanList>
            <Button onClick={this.addNewResource.bind(this)} color="primary" size="lg" active>Add New Resource Plan</Button>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { projectRates, isFetching } = state.projectRates
  const { isFetchingResources, resourcePlans, currPlan, currResId } = state.projectResourcePlans
  const { projectTasks } = state.projectTasks
  const { currProject } = state.projectOperations
  return {
    projectRates,
    isFetching,
    isFetchingResources,
    resourcePlans,
    currPlan,
    currResId,
    projectTasks,
    currProject
  }
}

export default connect(mapStateToProps)(ResourcePlan);
