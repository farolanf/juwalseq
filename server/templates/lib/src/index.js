const fs = require('fs')
const path = require('path')
const util = require('util')
const uncss = require('uncss')

const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

const css = require('./style.css')

function build () {
  const files = fs.readdirSync(path.resolve(__dirname, 'components'))
  
  return Promise.all(files.map(file => {
    if (!file.match(/\.js$/)) return Promise.resolve()
    
    const Html = require('./Html')
    const Body = require(`./components/${file}` )
    const result = renderToStaticMarkup(<Html><Body /></Html>)

    return util.promisify(uncss)(result, { 
      raw: css,
      ignoreSheets: [/.*/],
    }).then(css => {
      const html = '<!DOCTYPE html>' + result.replace('__STYLE__', css).replace('//fonts.googleapis.com', 'https://fonts.googleapis.com')
      const output = path.resolve(__dirname, '../../')
      const name = path.basename(file, '.js')
      fs.writeFileSync(`${output}/${name}.html`, html, 'utf8')
    })
  }))
}

build()