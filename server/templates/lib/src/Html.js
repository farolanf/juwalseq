const React = require('react')
const { TypographyStyle, GoogleFont } = require('react-typography')

const typography = require('./typography')

const Html = ({ children }) => (
  <html>
    <head>
      <TypographyStyle typography={typography} />
      <GoogleFont typography={typography} />
      <style>__STYLE__</style>
    </head>
    <body>
      <div className='m-8 p-8 w-full max-w-md mx-auto bg-blue-lightest'>
        <h1 className='text-center'>Juwal</h1>
        {children}
      </div>
    </body>
  </html>
)

module.exports = Html
