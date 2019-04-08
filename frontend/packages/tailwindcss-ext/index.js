module.exports = function (args) {
  column(args)
  list(args)
  order(args)
  position(args)
  border(args)
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

function list ({ addUtilities, config }) {
  const margin = config('margin')
  const style = {}
  for (let i = 1; i <= 8; i++) {
    style[`.list-x-${i}`] = {
      display: 'flex',
      'flex-direction': 'row',
      '& > *': {
        'margin-right': margin[i],
      }
    }
  }
  for (let i = 1; i <= 8; i++) {
    style[`.list-y-${i}`] = {
      display: 'flex',
      'flex-direction': 'column',
      '& > *': {
        'margin-bottom': margin[i],
      }
    }
  }
  addUtilities(style, {
    variants: config('modules.list')
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

function border ({ addUtilities, config }) {
  const colors = config('colors')
  const sides = ['top', 'right', 'bottom', 'left']
  const style = {}
  sides.forEach(side => {
    Object.keys(colors).forEach(color => {
      style[`.border-${side.substring(0, 1)}-${color}`] = { 
        [`border-${side}-color`]: colors[color]
      }
    })
  })
  addUtilities(style, {
    variants: config('modules.borderColors'),
  })
}