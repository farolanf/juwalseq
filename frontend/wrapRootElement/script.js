import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

import { PAYPAL_ID } from '$src/const'
import store from '$store'

const checkScripts = () => {
  !store.script.paypal
    && typeof paypal !== 'undefined' 
    && store.script.setScript('paypal', paypal)
}

const Script = ({ children }) => {
  useEffect(() => {
    const timerId = setInterval(checkScripts, 500)
    return () => clearInterval(timerId)
  }, [])
  return children
}

const wrapRootElement = element => (
  <Script>
    <Helmet>
      <script src={'https://www.paypal.com/sdk/js?client-id=' + PAYPAL_ID}></script>
    </Helmet>
    {element}
  </Script>
)

export default wrapRootElement