/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from 'react'
import _wrapRootElement from './wrapRootElement'
import { verify } from '$src/lib/auth'

verify()

export const wrapPageElement = ({ element }) => {
  if (element.props.noSSR) {
    return null
  }
  return _wrapRootElement(element)
}