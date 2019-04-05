exports.getURL = (uploadfs, item, size = '') => {
  if (size) {
    size = `.${size}`
  }
  return `${uploadfs.getUrl()}${item.basePath}${size}.${item.extension}`
}