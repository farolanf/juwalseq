import React, { useState, useEffect } from 'react'
import { connect } from 'formik'
import _ from 'lodash'

import FileDrop from 'react-file-drop'

function loadDataUrl (file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })
    reader.readAsDataURL(file)
  })
}

const FormikImageUploads = ({ name, max, maxSize = 500 * 1024, label, text, linkText, formik, className }) => {
  const prefix = `image-uploads-${name}-`
  const sortableId = prefix + 'sortable'

  useEffect(() => {
    if (formik.values[name].length !== max) {
      const items = []
      for (let i = 0; i < max; i++) {
        items.push({ key: i })
      }
      formik.setFieldValue(name, items, false)
    }
  }, [])

  useEffect(() => {
    return UIkit.util.on('#' + sortableId, 'moved', e => {
      console.log(e)
    })
  }, [])

  async function loadFile (file) {
    if (!file.type.startsWith('image/') || file.size > maxSize) return
    file.dataURL = await loadDataUrl(file)
    return file
  }

  const handleDrop = item => async files => {
    if (files.length) {
      item = _.find(formik.values[name], { key: item.key })
      item.file = await loadFile(files[0])
      formik.setFieldValue(name, formik.values[name])
    }
  }

  const handleChangeFile = item => e => {
    handleDrop(item)(e.target.files)
  }

  const handleClickBrowse = e => {
    e.target.nextSibling.click()
  } 

  const renderItem = item => (
    <div>
      <div hidden={!item.file}>
        <img src={item.file && item.file.dataURL} />
      </div>
      <div hidden={!!item.file}>
        <FileDrop onDrop={handleDrop(item)} targetClassName='uk-placeholder uk-text-center mb-0' draggingOverTargetClassName='border-green-light'>
          <span data-uk-icon='cloud-upload' />
          <span className='uk-text-middle'> {text} </span>
          <span className='uk-link hover:no-underline' 
          onClick={handleClickBrowse}>{linkText}</span>
          <input type='file' accept='image/*' hidden onChange={handleChangeFile(item)} />
        </FileDrop>
      </div>
    </div>
  )

  return (
    <div className={className}>
      {label && <label className='uk-form-label'>{label}</label>}
      <div className='uk-form-controls'>
        <div id={sortableId} className='uk-grid-small uk-child-width-1-4@s' data-uk-grid data-uk-sortable>
          {formik.values[name] && formik.values[name].map(item => (
            <div key={item.key} id={`#${prefix}item-${item.key}`}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default connect(FormikImageUploads)