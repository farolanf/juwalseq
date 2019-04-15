import React, { useState, useEffect } from 'react'

import dragula from 'react-dragula'
import 'react-dragula/dist/dragula.min.css'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.min.css'

import FileDrop from 'react-file-drop'
import Popup from '$comp/Popup'
import Modal from '$comp/Modal'

import withMobile from '$lib/mobile'

const messages = {
  sizeTooBig: max => {
    const sizeStr = Intl.NumberFormat().format(max / 1024)
    return `File terlalu besar, maksimal ${sizeStr}KB.`
  }
}

function loadDataUrl (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.readAsDataURL(file)
  })
}

const ImageUploads = ({ maxSize = 3000 * 1024, label, text, linkText, images, onChange, mobile }) => {
  const prefix = 'image-uploads-'
  const [sortableRef, setSortableRef] = useState()
  const [cropperRef, setCropperRef] = useState()
  const [flipX, setFlipX] = useState(1)
  const [flipY, setFlipY] = useState(1)
  const [error, setError] = useState()

  const imageCount = images.reduce((acc, item) => acc + (item.file ? 1 : 0), 0)

  const max = images.length

  useEffect(() => {
    cropperRef && cropperRef.scale(flipX, flipY)
  }, [flipX, flipY])

  // init dragula on each render so events work with current images
  useEffect(() => {
    if (!sortableRef) return
    const drake = dragula([sortableRef], {
      direction: mobile ? 'vertical' : 'horizontal',
      invalid (el) {
        // prevent dragging empty slot
        el = el.closest('[data-image-uploads-item]')
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
    drake.on('dragend', syncOrder)
    return () => drake.destroy()
  }, [sortableRef])

  // open first empty slot
  let open = false
  images.forEach(x => {
    if (!open && !x.file) {
      x.open = open = true
    } else {
      x.open = false
    }
  })

  function syncOrder () {
    const ordered = []
    const items = sortableRef.querySelectorAll('[data-image-uploads-item]')
    items.forEach(item => {
      ordered.push(getItem(item.getAttribute('data-key')))
    })
    onChange(ordered)
  }

  function getItem (key) {
    return images.find(item => item.key == key)
  }

  async function loadFile (file) {
    if (!file.type.startsWith('image/') || file.size > maxSize) {
      return setError(messages.sizeTooBig(maxSize))
    }
    setError()
    file.dataURL = file.originalDataURL = await loadDataUrl(file)
    return file
  }

  const handleDrop = item => async files => {
    if (files.length) {
      item.file = await loadFile(files[0])
      onChange(images.slice())
    }
  }

  const handleChangeFile = item => e => {
    handleDrop(item)(e.target.files)
  }

  const handleClickBrowse = () => {
    // use first empty slot
    const els = document.querySelectorAll('[data-image-uploads-item]')
    Array.from(els).find(el => {
      const item = getItem(el.getAttribute('data-key'))
      if (!item.file) {
        el.querySelector('input[type="file"]').click()
        return true
      }
    })
  }

  const handleRemove = item => () => {
    const input = sortableRef.querySelector(`[data-image-uploads-item][data-key="${item.key}"] input[type="file"]`)
    input.value = ''
    item.file = null
    onChange(images
      .sort((a, b) => (a.file ? 0 : 1) - (b.file ? 0 : 1))
      .slice())
  }

  const handleRotate = () => {
    cropperRef.rotate(-90)
  }

  const handleFlipY = () => {
    setFlipY(flipY * -1)
  }

  const handleFlipX = () => {
    setFlipX(flipX * -1)
  }

  const handleReset = item => () => {
    cropperRef.replace(item.file.originalDataURL)
  }

  const handleSave = item => () => {
    item.file.dataURL = cropperRef.getCroppedCanvas().toDataURL()
    onChange(images.slice())
  }

  const renderEditModal = item => (
    <Modal target={`#${prefix}crop-${item.key}`} dialogClass='md:max-w-sm'>
      {({ shown }) => (
        shown && (<>
          <Cropper src={_.get(item, 'file.dataURL')} minContainerHeight={400} autoCropArea={1} ref={setCropperRef} />
          <div className='flex flex-col md:flex-row md:justify-between md:items-start mt-4'>
            <div className='list-x-1 icon-nav justify-center md:justify-start'>
              <i className='fa fa-rotate-left' onClick={handleRotate} />
              <i className='fa fa-arrows-v' onClick={handleFlipY} />
              <i className='fa fa-arrows-h' onClick={handleFlipX} />
              <i className='fa fa-image' onClick={handleReset(item)} />
            </div>
            <div className='mt-6 md:mt-0 flex justify-end'>
              <a className='btn mr-1 close-btn'>Batal</a>
              <a className='btn btn-primary close-btn' onClick={handleSave(item)}>Simpan</a>
            </div>
          </div>
        </>)
      )}
    </Modal>
  )

  const renderImage = item => (
    <div hidden={!item.file} className='h-full border border-solid border-grey-lighter relative bg-contain bg-no-repeat bg-center' style={{ backgroundImage: item.file && `url(${item.file.dataURL})`, touchAction: 'none' }}>
      <div className='absolute pin opacity-100 md:opacity-0 hover:opacity-100 cursor-move'>
        <span className='fa fa-remove p-1 link absolute pin-t pin-r' onClick={handleRemove(item)}></span>
        <span className='fa fa-crop p-1 link absolute pin-t pin-l' id={`${prefix}crop-${item.key}`}></span>
        <span className='fa fa-image p-1 link absolute pin-b pin-r hover-trigger' id={`${prefix}view-full-${item.key}`}></span>
      </div>
      {mobile ? (
        <Modal target={`#${prefix}view-full-${item.key}`} closeOnClick>
          <div className='absolute pin bg-contain bg-no-repeat bg-center cursor-default' style={{ backgroundImage: item.file && `url(${item.file.dataURL})`, touchAction: 'none' }} />
        </Modal>
      ) : (
        <Popup target={`#${prefix}view-full-${item.key}`} pos='top' offset='15%p' hover click className='popup md:w-1/3 xl:w-1/5'>
          <div className='ratio-1:1 bg-contain bg-no-repeat bg-center cursor-default' style={{ backgroundImage: item.file && `url(${item.file.dataURL})`, touchAction: 'none' }} />
        </Popup>
      )}
      {renderEditModal(item)}
    </div>
  )

  const renderPlaceholder = item => (
    <div className='h-full flex justify-center items-center' onClick={handleClickBrowse} hidden={!item.open || item.file}>
      <FileDrop onDrop={handleDrop(item)} className='' targetClassName='mb-0 absolute pin flex justify-center items-center border border-dashed border-grey hover:border-green-light hover:text-green cursor-pointer text-grey-dark' draggingOverTargetClassName='border-green-light text-green'>
        <div>
          <i className='fa fa-cloud-upload' />
          <span className='text-grey'>{text}</span>
          <span>{linkText}</span>
          <input type='file' accept='image/*' hidden onChange={handleChangeFile(item)} />
        </div>
      </FileDrop>
    </div>
  )

  const renderItem = item => (
    <div className='ratio-1:1 relative'>
      <div className='absolute pin'>
        {renderImage(item)}
        {renderPlaceholder(item)}
      </div>
    </div>
  )

  return (
    <div className='form-field'>
      {label && <label className='field-label'>{label}</label>}
      <div className='field-control field-control-full'>
        <div className='list-y-1 md:list-x-1 flex-wrap' ref={setSortableRef}>
          {images.map(item => (
            <div key={item.key} className='mb-1 w-full md:w-24' data-key={item.key} data-image-uploads-item hidden={!item.file && !item.open}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        {error && <div className='text-xs text-red'>{error}</div>}
        {!error && <div className='text-xs text-grey text-right'>{`${imageCount}/${max}`}</div>}
      </div>
    </div>
  )
}

export default withMobile(ImageUploads)