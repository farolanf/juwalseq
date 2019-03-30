import React from 'react'
import { renderToString } from 'react-dom/server'

import './init'
import _wrapRootElement from './wrapRootElement'
import _wrapPageElement from './wrapPageElement'

import config from '$prj/gatsby-config'

export const wrapRootElement = ({ element }) => {
  return _wrapRootElement(element)
}

// we use wrapPageElement instead of wrapRootElement so we can test if
// the page is an Admin page to avoid wrapping it
export const wrapPageElement = ({ element }) => {
  // no ssr for admin
  if (element.props['*'].startsWith('admin')) {
    return null
  }
  return _wrapPageElement(element)
}

export const onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    className: 'screen-size'
  })
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const components = getHeadComponents()
  components.unshift(
    <title key='siteTitle'>{config.siteMetadata.title}</title>,
    <link key='preconnectApi' href={process.env.GATSBY_API_HOST} rel="preconnect" />,
    <link key='preconnectFonts' href="http://fonts.gstatic.com" rel="preconnect" />
  )
  replaceHeadComponents(components)
}

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const body = renderToString(bodyComponent)

  const window = require('window')

  // this will trigger UIkit's observers
  window.document.body.outerHTML = body

  const result = window.document.body.outerHTML
  replaceBodyHTMLString(result)
}