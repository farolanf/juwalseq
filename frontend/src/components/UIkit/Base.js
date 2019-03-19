import React, { useState, useEffect } from 'react'
import _ from 'lodash'

function optionsString (options) {
  return Object.keys(options).map(key => `${key}: ${options[key]}`).join('; ')
}

const Base = ({ ukComponent, baseOptions, options, events, className, children, ...props }, ref) => {
  const [elRef, setElRef] = useState()
  const optionsStr = optionsString(options || {})
  const htmlName = _.kebabCase(ukComponent)
  const Component = baseOptions.Component

  useEffect(() => {
    if (elRef) {
      UIkit[ukComponent](elRef, options)
    }
  }, [elRef, optionsStr])

  useEffect(() => {
    if (elRef && events) {
      const offs = []
      offs.concat(
        Object.keys(events).map(key => UIkit.util.on(elRef, key, events[key]))
      )
      return () => offs.forEach(off => off())
    }
  }, [elRef].concat(Object.values(events || [])))

  function setRef (el) {
    setElRef(el)
    ref && ref(el)
  }

  return (
    <Component className={className} ref={setRef} {...props} {...{[`data-uk-${htmlName}`]: optionsStr}}>
      {children}
    </Component>
  )
}

export default React.forwardRef(Base)