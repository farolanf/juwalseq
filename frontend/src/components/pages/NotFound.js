import React from "react"
import { Link } from 'gatsby'
import SEO from "$comp/SEO"

const NotFoundPage = () => (
  <div>
    <SEO title="404: Tidak ditemukan" />
    <h1 className='alert alert-danger p-4'>404 - Halaman tidak ditemukan</h1>
    <p><Link to='/' className='link'>Ke halaman depan</Link></p>
  </div>
)

export default NotFoundPage