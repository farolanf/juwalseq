import { useEffect } from 'react'

export function bindVisible (el, [visible, setVisible]) {
  useEffect(() => {
    if (el) {
      UIkit.util.on(el, 'show', () => setVisible(true))
      UIkit.util.on(el, 'hide', () => setVisible(false))
    }
  }, [el])
  return [visible, setVisible]
}