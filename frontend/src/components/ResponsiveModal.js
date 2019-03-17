import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import withMobile from '$lib/mobile'

const ResponsiveModal = ({ mobile, width, dialogClass, children, modalRef, ...props }) => {
  const [ref, setRef] = useState()
  const [closeRef, setCloseRef] = useState()
  const [show, setShow] = useState()
  const [shown, setShown] = useState()

  useEffect(() => {
    UIkit.util.toggleClass(ref, 'uk-modal-full', mobile)
    UIkit.util.toggleClass(closeRef, 'uk-modal-close-full uk-close-large', mobile)
    UIkit.util.toggleClass(closeRef, 'uk-modal-close-default', !mobile)
  })

  useEffect(() => {
    if (ref) {
      const offs = [
        UIkit.util.on(ref, 'show', () => setShow(true)),
        UIkit.util.on(ref, 'hide', () => setShow(false)),
        UIkit.util.on(ref, 'shown', () => setShown(true)),
        UIkit.util.on(ref, 'hidden', () => setShown(false)),
      ]
      return () => offs.forEach(off => off())
    }
  }, [ref])

  function _setRef (ref) {
    setRef(ref)
    modalRef && modalRef(ref)
  }

  return (
    <div data-uk-modal ref={_setRef} {...props}>
      <div className={cn('uk-modal-dialog uk-modal-body', dialogClass)} >
        <button className='uk-modal-close-default' type='button' data-uk-close ref={setCloseRef} />
        {typeof children === 'function' ? children({ show, shown }) : children}
      </div>
    </div>
  )
}

export default withMobile(ResponsiveModal)