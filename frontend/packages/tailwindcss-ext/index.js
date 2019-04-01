module.exports = function (args) {
  column(args)
  order(args)
  position(args)
}

function column ({ addUtilities, config }) {
  const style = {}
  for (let i = 1; i <= 12; i++) {
    style[`.column-${i}`] = { 'column-count': i }
  }
  addUtilities(style, {
    variants: config('modules.column')
  })
}

function order ({ addUtilities, config }) {
  const style = {
    '.order-start': { order: -100 },
    '.order-end': { order: 100 },
  }
  addUtilities(style, {
    variants: config('modules.order'),
  })
}

function position ({ addUtilities, config }) {
  const style = {
    '.pin-tb': { top: '100%' },
  }
  addUtilities(style, {
    variants: config('modules.position'),
  })
}