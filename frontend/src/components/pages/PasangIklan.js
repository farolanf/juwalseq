import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import autosize from 'autosize'

import FormikInput from '$comp/FormikInput'
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
    <div className='uk-section px-2'>
      <h3 className='uk-heading-bullet uk-text-muted'><span>Pasang iklan</span></h3>
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
          <Form className='uk-form-horizontal'>
            <div className='flex flex-col uk-width-1-1@s uk-width-xxlarge@m'>
              <FormikInput name='title' label='Judul' placeholder='Judul iklan' 
              help='Pilih judul yang singkat dan jelas' className='uk-margin' 
              width='1-1' />
              <FormikInput name='description' component='textarea' maxLength='4000' rows='4' label='Deskripsi' placeholder='Deskripsi iklan' 
              help='Jelaskan barang atau jasa dengan singkat beserta minusnya jika ada' className='uk-margin' inputClass='uk-textarea' width='1-1' 
              inputRef={setDescRef}
              extra={(
                <span className='text-xs'>{(values.description || '').length}/4000</span>
              )} />
              <FormikInput name='price' type='number' label='Harga' leftPrefix='Rp.' min='0' className='uk-margin' />
              <ImageUploads max={8} label='Foto' text='' linkText='Pilih' className='uk-margin' onChange={images => setFieldValue('images', images)} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PasangIklan