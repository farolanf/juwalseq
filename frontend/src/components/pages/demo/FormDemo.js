import React from 'react'
import Popup from '$comp/Popup'

const FormDemo = () => (
  <div className='md:column-2'>
    <h2>Input</h2>
    <h4>Default</h4>
    <div className='form-field'>
      <input className='input' placeholder='Username or email...' />
    </div>
    <h4 className='mt-4'>Label</h4>
    <div className='form-field'>
      <label className='field-label'>Username</label>
      <div className='form-control'>
        <input className='input' placeholder='Username or email...' />
      </div>
    </div>
    <h4>Help</h4>
    <div className='form-field'>
      <div className='form-control'>
        <input className='input' placeholder='Username or email...' />
      </div>
      <div className='field-help'>Please enter your username</div>
    </div>
    <h4>Error</h4>
    <div className='form-field'>
      <label className='field-label'>Username</label>
      <div className='form-control'>
        <input className='input has-error' placeholder='Username or email...' value='user3455' onChange={() => null} />
      </div>
      <div className='field-error'>Username is taken</div>
    </div>
    <h4>Addons</h4>
    <div className='form-field'>
      <label className='field-label'>Price</label>
      <div className='form-control'>
        <span className='input-prefix'>Rp</span>
        <input className='input pl-8 pr-6' type='number' />
        <span className='input-suffix'>,-</span>
      </div>
    </div>
    <h4>Horizontal</h4>
    <form className='form-horizontal'>
      <div className='form-field'>
        <label className='field-label'>Price</label>
        <div className='form-control'>
          <span className='input-prefix'>Rp</span>
          <input className='input pl-8 pr-6' type='number' value='2500' />
          <span className='input-suffix'>,-</span>
        </div>
      </div>
    </form>
    <h4>Horizontal - Right align label</h4>
    <form className='form-horizontal form-label-right'>
      <div className='form-field'>
        <label className='field-label'>Price</label>
        <div className='form-control'>
          <span className='input-prefix'>Rp</span>
          <input className='input px-8 pr-6' type='number' />
          <span className='input-suffix'>,-</span>
        </div>
      </div>
    </form>
    <h2>Button</h2>
    <div className='list-x-1'>
      <button className='btn'>Default</button>
      <button className='btn btn-primary'>Primary</button>
      <button className='btn btn-secondary'>Secondary</button>
    </div>
    <div className='bg-grey-dark p-8 my-4 list-x-1'>
      <button className='btn btn-dark'>Dark</button>
      <button className='btn btn-primary'>Primary</button>
      <button className='btn btn-secondary'>Secondary</button>
    </div>
    <h2>Button - disabled</h2>
    <div className='list-x-1'>
      <button className='btn' disabled>Default</button>
      <button className='btn btn-dark' disabled>Dark</button>
      <button className='btn btn-primary' disabled>Disabled</button>
      <button className='btn btn-secondary' disabled>Secondary</button>
    </div>
    <h2 className='mt-4'>Popup</h2>
    <h4>Light</h4>
    <div className='list-x-1'>
      <button className='btn btn-primary' id='popup-top'>Top</button>
      <button className='btn btn-primary' id='popup-bottom'>Bottom</button>
      <button className='btn btn-primary' id='popup-left'>Left</button>
      <button className='btn btn-primary' id='popup-right'>Right</button>
      <Popup target='#popup-top' pos='top' hover>Top</Popup>
      <Popup target='#popup-right' pos='right' hover>Right</Popup>
      <Popup target='#popup-bottom' pos='bottom' hover>Bottom</Popup>
      <Popup target='#popup-left' pos='left' hover>Left</Popup>
    </div>
    <h4 className='mt-4'>Dark</h4>
    <div className='list-x-1'>
      <button className='btn btn-primary' id='popup-top2'>Top</button>
      <button className='btn btn-primary' id='popup-bottom2'>Bottom</button>
      <button className='btn btn-primary' id='popup-left2'>Left</button>
      <button className='btn btn-primary' id='popup-right2'>Right</button>
      <Popup target='#popup-top2' pos='top' hover className='popup-dark'>Top</Popup>
      <Popup target='#popup-right2' pos='right' hover className='popup-dark'>Right</Popup>
      <Popup target='#popup-bottom2' pos='bottom' hover className='popup-dark'>Bottom</Popup>
      <Popup target='#popup-left2' pos='left' hover className='popup-dark'>Left</Popup>
    </div>
    <h2 className='mt-4'>Alert</h2>
    <h4>Info</h4>
    <div className='alert'>
      <span className='close' />
      Developing an organized, consistent and beautiful color palette is critical to the design success of a project. Tailwind provides a fantastic color system that makes this very easy to accomplish.
    </div>
    <h4>Success</h4>
    <div className='alert alert-success'>
      <span className='close' />
      Developing an organized, consistent and beautiful color palette is critical to the design success of a project. Tailwind provides a fantastic color system that makes this very easy to accomplish.
    </div>
    <h4>Warning</h4>
    <div className='alert alert-warning'>
      <span className='close' />
      Developing an organized, consistent and beautiful color palette is critical to the design success of a project. Tailwind provides a fantastic color system that makes this very easy to accomplish.
    </div>
    <h4>Danger</h4>
    <div className='alert alert-danger'>
      <span className='close' />
      Developing an organized, consistent and beautiful color palette is critical to the design success of a project. Tailwind provides a fantastic color system that makes this very easy to accomplish.
    </div>
  </div>
)

export default FormDemo