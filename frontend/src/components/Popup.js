import React, { useState, useEffect } from 'react'
import Popper from 'popper.js'

/**
 * Show popup based on show param or hover/click events.  
 */
const Popup = ({ show, onHide, hover, click, target, pos = 'bottom-start', offset = 0, delay = 250, hideDelay, className = 'popup', children }) => {
  const [ref, setRef] = useState()
  const [popper, setPopper] = useState()
  const [visible, setVisible] = useState()
  const [overPopup, setOverPopup] = useState()
  const [overTarget, setOverTarget] = useState()

  const handleMouseEnterPopup = () => setOverPopup(true)

  const handleMouseLeavePopup = () => {
    isNaN(hideDelay) 
      ? setOverPopup(false)
      : setTimeout(() => setOverPopup(false), hideDelay)
  }
  
  const handleClickPopup = () => setVisible(false)

  useEffect(() => {
    if (ref && target) {
      if (typeof target === 'string') {
        target = document.querySelector(target)
      }
      const popper = new Popper(target, ref, {
        placement: pos,
        positionFixed: true,
        modifiers: {
          offset: { offset },
          flip: { behavior: ['top', 'right', 'left', 'bottom'] },
        }
      })
      setPopper(popper)
      return () => popper.destroy()
    }
  }, [ref, target, pos, offset])

  useEffect(() => {
    if (typeof target === 'string') {
      target = document.querySelector(target)
    }
    // check enter time to avoid negating the visible state
    let enterTime = 0
    let leaveTime = 0
    let timerId
    const handleMouseUp = () => {
      (Date.now() - enterTime > 50) && setVisible(val => !val)
    }
    const handleMouseEnter = () => {
      let delayed = true
      enterTime = Date.now()
      // no delay on consecutive popups
      if ((enterTime - global.__popup_hide_time) < 1000) {
        delayed = false
      }
      clearTimeout(timerId)
      if (delayed) {
        timerId = setTimeout(() => {
          leaveTime < enterTime && setOverTarget(true)
        }, delay)
      } else {
        setOverTarget(true)
      }
    }
    const handleMouseLeave = () => {
      leaveTime = Date.now()
      isNaN(hideDelay) 
        ? setOverTarget(false)
        : setTimeout(() => setOverTarget(false), hideDelay)
    }

    click && target.addEventListener('mouseup', handleMouseUp)
    if (hover) {
      target.addEventListener('mouseenter', handleMouseEnter)
      target.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      click && target.removeEventListener('mouseup', handleMouseUp)
      if (hover) {
        target.removeEventListener('mouseenter', handleMouseEnter)
        target.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [target, hover, click])

  useEffect(() => {
    setVisible(overTarget || overPopup)
  }, [overTarget, overPopup])

  useEffect(() => {
    popper && (show || visible) && popper.scheduleUpdate()
    if (!show && !visible) {
      global.__popup_hide_time = Date.now()
    }
  }, [show, visible])

  return hover || click 
    ? (
      <div className={cn('fixed popper', className)} ref={setRef} hidden={!visible} onMouseEnter={handleMouseEnterPopup} onMouseLeave={handleMouseLeavePopup} onClick={handleClickPopup}>
        <span x-arrow='' />
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