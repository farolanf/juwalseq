import React from 'react'
import { create } from 'jss'
import preset from 'jss-preset-default'
import { JssProvider } from 'react-jss'

const jss = create()

jss.setup(preset())

const wrapRootElement = element => (
  <JssProvider jss={jss}>
    {element}
  </JssProvider>
)

export default wrapRootElement