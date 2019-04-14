import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import autosize from 'autosize'
import * as yup from 'yup'
import { observer, Observer } from 'mobx-react-lite'

import InputField from '$comp/InputField'
import FormikCheckbox from '$comp/FormikCheckbox'
import FormField from '$comp/FormField'
import ImageUploads from '$comp/ImageUploads'

import { addProduct } from '$api/product'
import { createBlob } from '$lib/dom'
import useStore from '$useStore'

const titleMin = 15,
  titleMax = 70,
  descMin = 30,
  descMax = 4000,
  priceMin = 0,
  priceMax = 1e15,
  imageMax = 8;

const schema = yup.object().shape({
  title: yup.string().min(titleMin).max(titleMax).required(),
  description: yup.string().min(descMin).max(descMax).required(),
  price: yup.number().min(priceMin).max(priceMax).required(),
  nego: yup.bool(),
  images: yup.array().max(imageMax),
  provinsiId: yup.number().required(),
  kabupatenId: yup.number().required(),
})

const messages = {
}

const createFormData = values => {
  const fd = new FormData()
  Object.keys(values).forEach(key => {
    if (key === 'images') {
      values[key].forEach(item => {
        if (!item.file) return
        const blob = createBlob(item.file.dataURL)
        const file = new File([blob], item.file.name, { type: blob.type })
        fd.append('images', file)
      })
    } else {
      fd.append(key, values[key])
    }
  })
  return fd
}

const PasangIklan = () => {
  const [descRef, setDescRef] = useState()
  const [error, setError] = useState()
  const { region } = useStore()

  const onSubmit = (values, { setSubmitting }) => {
    addProduct(createFormData(values))
      .catch(err => setError(messages[err.response.data.error]))
      .finally(() => setSubmitting(false))
  }

  const onValues = values => {
    values.provinsiId && region.fetchKabupatens(values.provinsiId)
  }

  useEffect(() => {
    region.fetchProvinsis()
  }, [])

  useEffect(() => {
    if (descRef) {
      autosize(descRef)
      return () => autosize.destroy(descRef)
    }
  }, [descRef])

  return (
    <Formik
      initialValues={{
        title: 'Jual HP milik pribadi ok banget',
        description: 'Seperti judul, dijual HP mantap murah',
        price: 350000,
        nego: true,
        images: [],
        provinsiId: '',
        kabupatenId: '',
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Observer>
          {() => (
            <div className='md:max-w-sm'>
              <h2>Pasang iklan</h2>
              {error && <div className='alert alert-danger'>{error}</div>}
              <Form className='form-horizontal field-label-right'>
                <InputField name='title' id='edit-title' label='Judul' placeholder='Judul iklan...' 
                help='Pilih judul yang singkat dan jelas.' full maxLength={titleMax} extra={(
                  <span className='text-xs text-grey'>{(values.title || '').length}/{titleMax}</span>
                )} />
                <InputField name='description' id='edit-description' component='textarea' maxLength={descMax} rows='4' label='Deskripsi' placeholder='Deskripsi iklan...' help='Jelaskan barang atau jasa dengan singkat beserta minusnya jika ada.' full inputRef={setDescRef} extra={(
                  <span className='text-xs text-grey'>{(values.description || '').length}/{descMax}</span>
                )} />
                <FormField full label='Harga'>
                  <InputField name='price' id='edit-price' type='number' leftPrefix='Rp.' min='0' inputClass='pl-10' />
                  <FormikCheckbox name='nego' id='edit-nego' label='Bisa nego' className='ml-2' checked={values.nego} />
                </FormField>
                <ImageUploads max={imageMax} label='Foto' text='' linkText='Pilih' onChange={images => setFieldValue('images', images)} />
                <InputField name='provinsiId' id='edit-provinsi' component='select' label='Provinsi'>
                  <option></option>
                  {_.map(region.sortedProvinsis, provinsi => (
                    <option key={provinsi.id} value={provinsi.id}>{provinsi.name}</option>
                  ))}
                </InputField>
                <InputField name='kabupatenId' id='edit-kabupaten' component='select' label='Kabupaten'>
                  <option></option>
                  {values.provinsiId && (region.provinsis[values.provinsiId].kabupatens || []).map(kabupaten => (
                    <option key={kabupaten.id} value={kabupaten.id}>{kabupaten.name}</option>
                  ))}
                </InputField>
                <FormField full containerClass='justify-center md:justify-start'>
                  <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                    <i className='fa fa-spinner fa-spin' hidden={!isSubmitting} /> Simpan
                  </button>
                </FormField>
              </Form>
              {onValues(values)}
            </div>
          )}
        </Observer>
      )}
    </Formik>
  )
}

export default observer(PasangIklan)