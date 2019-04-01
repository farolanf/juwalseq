module.exports = function (args) {
  column(args)
  list(args)
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

function list ({ addUtilities, config }) {
  const margin = config('margin')
  const style = {}
  for (let i = 1; i <= 8; i++) {
    style[`.list-x-${i}`] = {
      display: 'flex',
      '& > *:not(:last-child)': {
        'margin-right': margin[i],
      }
    }
  }
  for (let i = 1; i <= 8; i++) {
    style[`.list-y-${i}`] = {
      display: 'flex',
      'flex-direction': 'column',
      '& > *:not(:last-child)': {
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