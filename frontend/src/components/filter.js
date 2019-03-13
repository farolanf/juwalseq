import React from 'react'

import withStyles from 'react-jss'
import { Button } from 'antd'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'

import useStore from '$useStore'

const styles = {
}

const Filter = ({ classes }) => {
  const { product, filter } = useStore()

  const departments = product.products.aggregations.all.search.departments.name.buckets
  const categories = product.products.aggregations.all.search.categories.name.buckets
  const attributes = product.products.aggregations.all.search.attributes.name.buckets

  const hasFilters = !!filter.departments.length
    || !!filter.categories.length
    || !!filter.attributes.length

  function handleClickClear () {
    filter.clearFilters()
  }

  return (
    <div className={classes.root}>
      {hasFilters && (
        <div className={classes.clear}>
          <Button color='inherit' onClick={handleClickClear}>
            <FontAwesomeIcon icon={faTimes} className={classes.icon} />
            Clear filters
          </Button>
        </div>
      )}
      <div component='fieldset' className={classes.filterGroup}>
        <div component='legend'>Departments</div>
        <div>
          {departments && departments.map(d => (
            <div
              key={d.key}
              control={
                <Checkbox
                  checked={filter.departments.includes(d.key) || departments.length === 1}
                  onChange={() => filter.toggleDepartment(d.key)}
                  className={classes.checkbox}
                  disabled={departments.length === 1}
                />
              }
              label={d.key + ` (${d.doc_count})`}
              />
          ))}
        </div>
      </div>
      <div component='fieldset' className={classes.filterGroup}>
        <div component='legend'>Categories</div>
        <div>
          {categories && categories.map(d => (
            <div
              key={d.key}
              control={
                <Checkbox
                  checked={filter.categories.includes(d.key) || categories.length === 1}
                  onChange={() => filter.toggleCategory(d.key)}
                  className={classes.checkbox}
                  disabled={categories.length === 1}
                />
              }
              label={d.key + ` (${d.doc_count})`}
              />
          ))}
        </div>
      </div>
      {attributes && attributes.map(d => (
        <div component='fieldset' className={classes.filterGroup} key={d.key}>
          <div component='legend'>{d.key}</div>
          <div>
            {d.value.buckets.map(v => (
              <div
                key={v.key}
                control={
                  <Checkbox
                    checked={!!filter.attributes.find(
                      a => a.name === d.key && a.value === v.key
                    )}
                    onChange={() => filter.toggleAttribute(d.key, v.key)}
                    className={classes.checkbox}
                  />
                }
                label={v.key + ` (${v.doc_count})`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withStyles(styles)(Filter)