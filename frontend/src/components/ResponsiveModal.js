import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import withMobile from '$lib/mobile'
import Uk from '$comp/UIkit'

const ResponsiveModal = ({ mobile, width, largeFullClose = true, dialogClass, dialogStyle, children, rootRef, ...props }) => {
  const [elRef, setElRef] = useState()
  const [closeRef, setCloseRef] = useState()
  const [show, setShow] = useState()
  const [shown, setShown] = useState()

  useEffect(() => {
    UIkit.util.toggleClass(elRef, 'uk-modal-full', mobile)
    if (largeFullClose) {
      UIkit.util.toggleClass(closeRef, 'uk-modal-close-full uk-close-large', mobile)
      UIkit.util.toggleClass(closeRef, 'uk-modal-close-default', !mobile)
    }
  })

  useEffect(() => {
    if (elRef) {
      const offs = [
        UIkit.util.on(elRef, 'show', () => setShow(true)),
        UIkit.util.on(elRef, 'hide', () => setShow(false)),
        UIkit.util.on(elRef, 'shown', () => setShown(true)),
        UIkit.util.on(elRef, 'hidden', () => setShown(false)),
      ]
      return () => offs.forEach(off => off())
    }
  }, [elRef])

  function setRef (el) {
    setElRef(el)
    rootRef && rootRef(el)
  }

  return (
    <Uk.modal ref={setRef} {...props}>
      <div className={cn('uk-modal-dialog uk-modal-body', dialogClass)} style={dialogStyle}>
        <button className='uk-modal-close-default' type='button' data-uk-close ref={setCloseRef} />
        {typeof children === 'function' ? children({ show, shown }) : children}
      </div>
    </Uk.modal>
  )
}

export default withMobile(ResponsiveModal)