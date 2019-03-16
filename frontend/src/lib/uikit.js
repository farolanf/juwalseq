import { useEffect } from 'react'

export function bindVisible (el, [visible, setVisible]) {
  useEffect(() => {
    if (el) {
      const off1 = UIkit.util.on(el, 'show', () => setVisible(true))
      const off2 = UIkit.util.on(el, 'hide', () => setVisible(false))
      return () => {
        off1()
        off2()
      }
    }
  }, [el])
  return [visible, setVisible]
}