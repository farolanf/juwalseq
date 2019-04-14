export function createArray (count) {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(i)
  }
  return items
}

export function setItem (name, val) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(name, val)
}

export function getItem (name, defaultValue) {
  if (typeof localStorage === 'undefined') return defaultValue
  return localStorage.getItem(name) || defaultValue
}

export function removeItem (name) {
  if (typeof localStorage === 'undefined') return
  return localStorage.removeItem(name)
}