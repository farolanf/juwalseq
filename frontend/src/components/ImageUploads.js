import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import dragula from 'react-dragula'
import 'react-dragula/dist/dragula.min.css'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.min.css'

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
  const [editItem, setEditItem] = useState()
  const [cropper, setCropper] = useState()
  const [flipX, setFlipX] = useState(1)
  const [flipY, setFlipY] = useState(1)

  const imageCount = images.reduce((acc, item) => acc + (item.file ? 1 : 0), 0)

  useEffect(() => {
    if (images.length !== max) {
      const items = images.slice()
      for (let i = images.length; i < max; i++) {
        items.push({ key: i })
      }
      setImages(items)
    }
  })

  useEffect(() => {
    cropper && cropper.scale(flipX, flipY)
  }, [flipX, flipY])

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
    } else {
      x.open = false
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
      const _images = images.slice()
      setImages(_images)
      onChange(_images)
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

  const handleRemove = item => () => {
    item = images.find(x => x.key === item.key)
    item.file = null
    setImages(images
      .sort((a, b) => (a.file ? 0 : 1) - (b.file ? 0 : 1))
      .slice())
  }

  const handleEdit = item => () => {
    setEditItem(item)
    UIkit.modal('#image-upload-modal').show()
  }

  const handleRotate = () => {
    cropper.rotate(90)
  }

  const handleFlipY = () => {
    setFlipY(flipY * -1)
  }

  const handleFlipX = () => {
    setFlipX(flipX * -1)
  }

  const renderImage = item => (
    <div hidden={!item.file} className='h-full uk-background-contain uk-card uk-card-default cursor-move' style={{ backgroundImage: item.file && `url(${item.file.dataURL})` }}>
      <a className='uk-position-top-left p-1' data-uk-icon='close' onClick={handleRemove(item)} />
      <a className='uk-position-top-right p-1' data-uk-icon='settings' onClick={handleEdit(item)} />
    </div>
  )

  const renderPlaceholder = item => (
    <div hidden={!item.open || item.file}>
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
  )

  const renderItem = item => (
    <div className='uk-height-small uk-inline w-full'>
      {renderImage(item)}
      {renderPlaceholder(item)}
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
      <ResponsiveModal id='image-upload-modal' largeFullClose={false} dialogStyle={{ height: 502 }}>
        {({ shown }) => (
          editItem && shown && (
            <>
              <Cropper src={editItem.file.dataURL} minContainerHeight={400} ref={setCropper} />
              <div className='flex flex-col md:flex-row md:justify-between mt-4'>
                <ul className='uk-iconnav justify-center md:justify-start'>
                  <li>
                    <a data-uk-icon='refresh' data-uk-tooltip='Putar' onClick={handleRotate} />
                  </li>
                  <li data-uk-tooltip='Flip vertikal'>
                    <a data-uk-icon='arrow-up' onClick={handleFlipY} />
                  </li>
                  <li data-uk-tooltip='Flip horizontal'>
                    <a data-uk-icon='arrow-right' onClick={handleFlipX} />
                  </li>
                </ul>
                <div className='mt-6 md:mt-0 flex justify-end'>
                  <button className='uk-button uk-button-default uk-modal-close mr-1'>Batal</button>
                  <button className='uk-button uk-button-primary'>Simpan</button>
                </div>
              </div>
            </>
          )
        )}
      </ResponsiveModal>
    </div>
  )
}

export default ImageUploads