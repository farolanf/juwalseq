import React from 'react'

const Popup = ({ open, onClose, children }) => {
  return (
    <div hidden={!open}>
      <div className='fixed pin z-popup' onClick={onClose}></div>
      <div className='popup z-popup'>
        {children}
      </div>
    </div>
  )
}

export default Popup