import React from 'react'
import { withDataProvider, UPDATE } from 'react-admin'
import NativeSelect from '@material-ui/core/NativeSelect'

const LEVELS = 100
const orders = []

for (let i = -LEVELS; i <= LEVELS; i++) {
  orders.push({ value: i, label: ''+i })
}

class OrderSelect extends React.Component {
  handleClick = e => e.stopPropagation()

  handleChange = e => {
    const { dataProvider, record, resource } = this.props
    const updateRecord = { ...record, order: e.target.value }
    dataProvider(UPDATE, resource, { id: record.id, data: updateRecord }, {
      refresh: true
    })
  }

  render () {
    const { source, record } = this.props
    return (
      <NativeSelect 
        name={source} 
        value={record[source]} 
        onChange={this.handleChange}
        onClick={this.handleClick}
      >
        {orders.map(order => (
          <option value={order.value} key={order.value}>{order.label}</option>
        ))}
      </NativeSelect>
    )
  }
}

export default withDataProvider(OrderSelect)