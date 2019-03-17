import React, { useState, useEffect } from 'react'
import cn from 'classnames'

const ResponsiveModal = ({ mobile, dialogClass, children, ...props }) => {
  const [ref, setRef] = useState()
  const [closeRef, setCloseRef] = useState()

  console.log('mobile', mobile)

  useEffect(() => {
    UIkit.util.toggleClass(ref, 'uk-modal-full', mobile)
    UIkit.util.toggleClass(closeRef, 'uk-modal-close-full uk-close-large', mobile)
    UIkit.util.toggleClass(closeRef, 'uk-modal-close-default', !mobile)
  })

  return (
    <div data-uk-modal ref={setRef} {...props}>
      <div className={cn('uk-modal-dialog uk-modal-body', dialogClass)} >
        <button className='uk-modal-close-default' type='button' data-uk-close ref={setCloseRef} />
        {children}
      </div>
    </div>
  )
}

export default ResponsiveModal