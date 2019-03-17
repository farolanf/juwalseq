import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import dragula from 'react-dragula'
import 'react-dragula/dist/dragula.min.css'

import FileDrop from 'react-file-drop'
import ResponsiveModal from '$comp/ResponsiveModal'

function loadDataUrl (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.readAsDataURL(file)
  })
}

const ImageUploads = ({ name, max, maxSize = 500 * 1024, label, text, linkText, className, onChange }) => {
  const prefix = `image-uploads-${name}-`
  const sortableId = prefix + 'sortable'

  const [images, setImages] = useState([])

  const imageCount = images.reduce((acc, item) => acc + (item.file ? 1 : 0), 0)

  useEffect(() => {
    if (images.length !== max) {
      const items = []
      for (let i = 0; i < max; i++) {
        items.push({ key: i })
      }
      setImages(items)
    }
  }, [])

  // init dragula on each render so events work with current images
  useEffect(() => {
    const sortable = document.querySelector(`#${sortableId}`)
    const drake = dragula([sortable], {
      direction: 'horizontal',
      invalid (el) {
        // prevent dragging empty slot
        el = el.closest('[data-imageupload-item]')
        if (el) {
          const item = getItem(el.getAttribute('data-key'))
          return !item || !item.file
        }
        return true
      },
      accepts (el, target, src, sibling) {
        // only allow swapping with non-empty slot
        if (sibling === el) return true
        if (sibling) {
          const other = getItem(sibling.getAttribute('data-key'))
          if (other && other.file) return true
          if (sibling.previousSibling) {
            const other = getItem(sibling.previousSibling.getAttribute('data-key'))
            if (other && other.file) return true
          }
        } else {
          const lastEl = target.children[target.children.length - 1]
          const other = getItem(lastEl.getAttribute('data-key'))
          if (other && other.file) return true
        }
        return false
      }
    })
    return () => drake.destroy()
  })

  // open first empty slot
  let open = false
  images.forEach(x => {
    if (!open && !x.file) {
      x.open = open = true
    }
  })

  function getItem (key) {
    return images.find(item => item.key == key)
  }

  async function loadFile (file) {
    if (!file.type.startsWith('image/') || file.size > maxSize) return
    file.dataURL = await loadDataUrl(file)
    return file
  }

  const handleDrop = item => async files => {
    if (files.length) {
      item = _.find(images, { key: item.key })
      item.file = await loadFile(files[0])
      setImages(images)
      onChange(images)
    }
  }

  const handleChangeFile = item => e => {
    handleDrop(item)(e.target.files)
  }

  const handleClickBrowse = () => {
    // use first empty slot
    const els = document.querySelectorAll('[data-imageupload-item]')
    Array.from(els).find(el => {
      const item = getItem(el.getAttribute('data-key'))
      if (!item.file) {
        el.querySelector('input[type="file"]').click()
        return true
      }
    })
  }

  const handleRemove = item => {

  }

  const handleEdit = item => {

  }

  const renderItem = item => (
    <div className='uk-height-small uk-inline w-full'>
      <div hidden={!item.file} className='h-full uk-background-contain uk-card uk-card-default cursor-move' style={{ backgroundImage: item.file && `url(${item.file.dataURL})` }}>
        <a className='uk-position-top-left p-1' data-uk-icon='close' onClick={handleRemove(item)} />
        <a className='uk-position-top-right p-1' data-uk-icon='settings' onClick={handleEdit(item)} />
      </div>
      <div hidden={!item.open || !!item.file}>
        <FileDrop onDrop={handleDrop(item)} className='uk-height-small' targetClassName='uk-placeholder mb-0 uk-height-small flex justify-center items-center' draggingOverTargetClassName='border-green-light'>
          <div>
            <span data-uk-icon='cloud-upload' />
            <span className='uk-text-middle'> {text} </span>
            <span className='uk-link hover:no-underline' 
            onClick={handleClickBrowse}>{linkText}</span>
            <input type='file' accept='image/*' hidden onChange={handleChangeFile(item)} />
          </div>
        </FileDrop>
      </div>
      <div hidden={item.open} className='uk-placeholder mt-0 mb-0 uk-height-small' />
    </div>
  )

  return (
    <div className={className}>
      {label && <label className='uk-form-label'>{label}</label>}
      <div className='uk-form-controls'>
        <div id={sortableId} className='uk-grid-small uk-child-width-1-4@s' data-uk-grid>
          {images.map(item => (
            (item.file || item.open) && (
            <div key={item.key} data-key={item.key} data-imageupload-item>
              {renderItem(item)}
            </div>
            )
          ))}
        </div>
        <div className='uk-text-muted mt-1 text-right text-xs'>{`${imageCount}/${max}`}</div>
      </div>
      <ResponsiveModal id='image-upload-modal' />
    </div>
  )
}

export default ImageUploads