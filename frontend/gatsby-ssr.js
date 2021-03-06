import './init'

import React from 'react'

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

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const components = getHeadComponents()
  
  components.unshift(
    <title key='siteTitle'>{config.siteMetadata.title}</title>,
  )

  replaceHeadComponents(components)
}