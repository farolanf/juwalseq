/**
 * Toggle el classes specified by cls.
 * 
 * This will only modify classes specified in the cls array|object, any other
 * classes will remain intact. Useful for toggling UIkit elements.
 * 
 * If cls is a string: if force is specified then the class will toggle,
 * otherwise its state determined by force.
 * 
 * If cls is an object then its keys are class names and their values will
 * determine the active/inactive state.
 * 
 * @param {Element} el 
 * @param {array|object} cls 
 * @param {boolean} force 
 */
export function toggleClass(el, cls, force) {
  if (!el) return
  if (typeof cls === 'string') {
    cls = { [cls]: force }
  } else if (!Array.isArray(cls) && typeof cls !== 'object') {
    throw new Error('Invalid cls type, expected: string|array|object')
  }
  Object.keys(cls).forEach(name => {
    el.classList.toggle(name, cls[name])
  })
}

export const createBlob = dataURL => {
  const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0]
  const byteString = dataURL.split(',')[1]
  const ab = new ArrayBuffer(byteString.length)
  const ui8 = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ui8[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeType })
  return blob
}
