import React from 'react'

import './init'
import _wrapRootElement from './wrapRootElement'

import config from '$prj/gatsby-config'

// we use wrapPageElement instead of wrapRootElement so we can test if
// the page is an Admin page to avoid wrapping it
export const wrapPageElement = ({ element }) => {
  // no ssr for admin
  if (element.props['*'].startsWith('admin')) {
    return null
  }
  return _wrapRootElement(element)
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const components = getHeadComponents()
  components.unshift(
    <title key='siteTitle'>{config.siteMetadata.title}</title>
  )
  replaceHeadComponents(components)
}