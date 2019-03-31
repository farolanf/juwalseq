import React from 'react'
import { ThemeContext } from '$lib/theme'

import theme from '$src/theme'

const wrapRootElement = element => (
  <ThemeContext.Provider value={theme}>
    {element}
  </ThemeContext.Provider>
)

export default wrapRootElement