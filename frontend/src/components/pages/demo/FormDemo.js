import React from 'react'

const FormDemo = () => (
  <div>
    <div className='p-4 m-4'>
      <div className='form-field'>
        <label className='input-label'>Username</label>
        <div className='form-control'>
          <input className='input' placeholder='Username or email...' />
        </div>
        <div className='field-help'>Please enter your username</div>
      </div>
      <div className='form-field'>
        <label className='input-label'>Price</label>
        <div className='form-control'>
          <span className='input-addon'>Rp</span>
          <input className='input has-suffix has-error' type='number' />
          <span className='input-addon'>,-</span>
        </div>
        <div className='field-error'>Can't be negative</div>
      </div>
    </div>
    <button className='btn'>Default</button>
    <button className='btn btn-primary'>Default</button>
    <button className='btn btn-secondary'>Default</button>
    <div className='bg-grey-dark p-8 mt-4'>
      <button className='btn btn-dark'>Dark</button>
      <button className='btn btn-primary'>Default</button>
      <button className='btn btn-secondary'>Default</button>
    </div>
  </div>
)

export default FormDemo