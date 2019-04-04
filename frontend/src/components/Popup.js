import React, { useState, useEffect } from 'react'
import Popper from 'popper.js'

/**
 * Show popup based on show param or hover/click events.  
 */
const Popup = ({ show, onHide, hover, click, target, pos = 'bottom-start', children }) => {
  const [ref, setRef] = useState()
  const [popper, setPopper] = useState()
  const [visible, setVisible] = useState()
  const [overPopup, setOverPopup] = useState()
  const [overTarget, setOverTarget] = useState()
  const [handleMouseEnter] = useState(() => () => setOverTarget(true))
  const [handleMouseLeave] = useState(() => () => setOverTarget(false))
  const [handleMouseUp] = useState(() => () => setVisible(val => !val))

  const handleMouseEnterPopup = () => setOverPopup(true)
  
  const handleMouseLeavePopup = () => setOverPopup(false)

  useEffect(() => {
    if (ref && target) {
      if (typeof target === 'string') {
        target = document.querySelector(target)
      }
      const popper = new Popper(target, ref, {
        placement: pos,
      })
      setPopper(popper)
      if (hover) {
        target.addEventListener('mouseenter', handleMouseEnter)
        target.addEventListener('mouseleave', handleMouseLeave)
      }
      click && target.addEventListener('mouseup', handleMouseUp)
      return () => {
        popper.destroy()
        if (hover) {
          target.removeEventListener('mouseenter', handleMouseEnter)
          target.removeEventListener('mouseleave', handleMouseLeave)
        }
        click && target.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [ref, target])

  useEffect(() => {
    popper && (show || visible) && popper.scheduleUpdate()
  }, [show, visible])

  useEffect(() => {
    setVisible(overTarget || overPopup)
  }, [overTarget, overPopup])

  return hover || click 
    ? (
      <div className='fixed' ref={setRef} hidden={!visible} onMouseEnter={handleMouseEnterPopup} onMouseLeave={handleMouseLeavePopup}>
        {children}
      </div>
    ) : (
      <div className='fixed pin z-popup' hidden={!show}>
        <div className='fixed pin' onClick={onHide} />
        <div className='fixed' ref={setRef}>
          {children}
        </div>
      </div>
    )
}

export default Popup