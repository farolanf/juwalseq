import React from 'react'

const FormDemo = () => (
  <div className='md:column-3'>
    <h2>Input</h2>
    <h4>Default</h4>
    <div className='form-field'>
      <label className='input-label'>Username</label>
      <div className='form-control'>
        <input className='input' placeholder='Username or email...' />
      </div>
      <div className='field-help'>Please enter your username</div>
    </div>
    <h4>Error</h4>
    <div className='form-field'>
      <label className='input-label'>Username</label>
      <div className='form-control'>
        <input className='input has-error' placeholder='Username or email...' value='user3455' onChange={() => null} />
      </div>
      <div className='field-error'>Username is taken</div>
    </div>
    <h4>Addons</h4>
    <div className='form-field'>
      <label className='input-label'>Price</label>
      <div className='form-control has-prefix has-suffix'>
        <span className='input-addon'>Rp</span>
        <input className='input' type='number' />
        <span className='input-addon'>,-</span>
      </div>
    </div>
    <h4>Horizontal</h4>
    <form className='form-horizontal'>
      <div className='form-field'>
        <label className='input-label'>Price</label>
        <div className='form-control has-prefix has-suffix'>
          <span className='input-addon'>Rp</span>
          <input className='input' type='number' />
          <span className='input-addon'>,-</span>
        </div>
      </div>
    </form>
    <h4>Horizontal - Right align label</h4>
    <form className='form-horizontal form-label-right'>
      <div className='form-field'>
        <label className='input-label'>Price</label>
        <div className='form-control has-prefix has-suffix'>
          <span className='input-addon'>Rp</span>
          <input className='input' type='number' />
          <span className='input-addon'>,-</span>
        </div>
      </div>
    </form>

    <h2>Button</h2>
    <button className='btn'>Default</button>
    <button className='btn btn-primary'>Primary</button>
    <button className='btn btn-secondary'>Secondary</button>
    <div className='bg-grey-dark p-8 mt-4'>
      <button className='btn btn-dark'>Dark</button>
      <button className='btn btn-primary'>Primary</button>
      <button className='btn btn-secondary'>Secondary</button>
    </div>
  </div>
)

export default FormDemo