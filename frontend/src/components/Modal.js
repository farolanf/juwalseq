import React, { useState, useEffect } from 'react'

const Modal = ({ target, noCloseButton, closeOnClick, className, dialogClass, children }) => {
  const [ref, setRef] = useState()
  const [visible, setVisible] = useState()

  const handleModalClick = () => setVisible(false)

  const handleDialogClick = e => {
    e.stopPropagation()
    closeOnClick && setVisible(false)
  }

  const handleClose = () => setVisible(false)

  useEffect(() => {
    if (ref) {
      const handleCloseDelayed = () => {
        setTimeout(() => setVisible(false), 0)
      }
      const buttons = ref.querySelectorAll('.close-btn')
      buttons.forEach(btn => btn.addEventListener('click', handleCloseDelayed))
      return () => buttons.forEach(btn => btn.removeEventListener('click', handleCloseDelayed))
    }
  })

  useEffect(() => {
    const _target = target
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    if (!target) throw new Error('Invalid target ' + _target)
    const toggleModal = () => setVisible(val => !val)
    target.addEventListener('click', toggleModal)
    return () => target.removeEventListener('click', toggleModal)
  }, [target])

  return (
    <div className={cn('modal', className)} onClick={handleModalClick} hidden={!visible} ref={setRef}>
      <div className={cn('modal-dialog', dialogClass)} onClick={handleDialogClick}>
        {!noCloseButton && <span className='close' onClick={handleClose} />}
        {typeof children === 'function' ? children({ shown: visible }) : children}
      </div>
    </div>
  )
}

export default Modal