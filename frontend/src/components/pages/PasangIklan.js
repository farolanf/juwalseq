import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import autosize from 'autosize'

import InputField from '$comp/InputField'
import ImageUploads from '$comp/ImageUploads'

const PasangIklan = () => {
  const [descRef, setDescRef] = useState()

  useEffect(() => {
    if (descRef) {
      autosize(descRef)
      return () => autosize.destroy(descRef)
    }
  }, [descRef])

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: '',
        nego: true,
        images: [],
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <div className='md:max-w-sm'>
          <h2>Pasang iklan</h2>
          <Form className='form-horizontal field-label-right'>
            <InputField name='title' label='Judul' placeholder='Judul iklan' 
            help='Pilih judul yang singkat dan jelas.' full maxLength='70' extra={(
              <span className='text-xs text-grey'>{(values.title || '').length}/70</span>
            )} />
            <InputField name='description' component='textarea' maxLength='4000' rows='4' label='Deskripsi' placeholder='Deskripsi iklan' help='Jelaskan barang atau jasa dengan singkat beserta minusnya jika ada.' inputRef={setDescRef} extra={(
              <span className='text-xs text-grey'>{(values.description || '').length}/4000</span>
            )} />
            <InputField name='price' type='number' label='Harga' leftPrefix='Rp.' min='0' inputClass='pl-10' />
            <ImageUploads max={8} label='Foto' text='' linkText='Pilih' onChange={images => setFieldValue('images', images)} />
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default PasangIklan