/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'typeface-roboto'
import _wrapRootElement from './wrapRootElement'

export const wrapPageElement = ({ element }) => _wrapRootElement(element)