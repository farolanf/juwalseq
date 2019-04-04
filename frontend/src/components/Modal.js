import React, { useState, useEffect } from 'react'

const Modal = ({ target, noCloseButton, closeOnClick, className, dialogClass, children }) => {
  const [visible, setVisible] = useState()

  const handleModalClick = e => {
    e.stopPropagation()
    closeOnClick && setVisible(false)
  }

  const handleClose = () => setVisible(false)

  useEffect(() => {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    const toggleModal = () => setVisible(val => !val)
    target.addEventListener('click', toggleModal)
    return () => target.removeEventListener('click', toggleModal)
  }, [target])

  return (
    <div className={cn('modal', className)} onClick={handleModalClick} hidden={!visible}>
      <div className={cn('modal-dialog', dialogClass)}>
        {!noCloseButton && <span className='close' onClick={handleClose} />}
        {children}
      </div>
    </div>
  )
}

export default Modal